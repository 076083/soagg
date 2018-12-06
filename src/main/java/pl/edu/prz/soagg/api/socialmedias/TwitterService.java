package pl.edu.prz.soagg.api.socialmedias;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import pl.edu.prz.soagg.api.data.SocialAccount;
import pl.edu.prz.soagg.api.data.SocialAccountRepository;
import pl.edu.prz.soagg.api.data.SocialPost;
import pl.edu.prz.soagg.api.data.SocialPostRepository;
import pl.edu.prz.soagg.api.feeds.Feed;
import pl.edu.prz.soagg.api.feeds.FeedRepository;
import pl.edu.prz.soagg.api.feeds.FeedType;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class TwitterService {
    private static final FeedType feedType = FeedType.FEED_TWITTER;

    private final SocialAccountRepository socialAccountRepository;
    private final SocialPostRepository socialPostRepository;
    private final FeedRepository feedRepository;

    public TwitterService(SocialAccountRepository socialAccountRepository, SocialPostRepository socialPostRepository, FeedRepository feedRepository) {
        this.socialAccountRepository = socialAccountRepository;
        this.socialPostRepository = socialPostRepository;
        this.feedRepository = feedRepository;
    }

    @Scheduled(initialDelay = 5 * 1000, fixedDelay = 30 * 60 * 1000)
    public void getTwitterAccounts() {
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + ApiKeysRepository.getApiKeyTwitter());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        List<Feed> feedList = feedRepository.findAllByFeedType(feedType);
        String handles = feedList
                .stream()
                .map(Feed::getFeedHandle)
                .distinct()
                .reduce((s1, s2) -> s1 + "," + s2)
                .orElse("");

        HttpEntity<String> response = restTemplate.exchange(
                "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + handles,
                HttpMethod.GET, entity, String.class);

        List<SocialAccount> list = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode items = objectMapper.readTree(response.getBody());
            Iterator<JsonNode> iterator = items.elements();

            while (iterator.hasNext()) {
                JsonNode item = iterator.next();
                String handle = item.path("screen_name").asText().toLowerCase();

                SocialAccount account = socialAccountRepository.findFirstByFeedTypeAndHandle(feedType, handle);

                if (account == null) {
                    account = new SocialAccount();
                }

                account.setHandle(handle);
                account.setUsername(item.path("screen_name").asText());
                account.setDescription(item.path("description").asText());
                account.setDisplayName(item.path("name").asText());
                account.setFeedType(feedType);
                account.setImageUrl(item.path("profile_image_url_https").asText());
                account.setLocation(item.path("location").asText());
                account.setProfileUrl(feedType.getUrl() + handle);

                list.add(account);
            }
        } catch (IOException ignored) {
        }

        socialAccountRepository.saveAll(list);
    }

    @Scheduled(initialDelay = 10 * 1000, fixedDelay = 30 * 60 * 1000)
    public void getTwitterPosts() {
        List<Feed> feedList = feedRepository.findAllByFeedType(feedType);
        List<String> handles = feedList
                .stream()
                .map(Feed::getFeedHandle)
                .distinct()
                .collect(Collectors.toList());

        List<SocialPost> list = new ArrayList<>();

        for (String handle : handles) {
            HttpEntity<String> response;

            try {
                RestTemplate restTemplate = new RestTemplate();

                MultiValueMap<String, String> headers = new HttpHeaders();
                headers.add("Authorization", "Bearer " + ApiKeysRepository.getApiKeyTwitter());
                HttpEntity<String> entity = new HttpEntity<>(headers);

                response = restTemplate.exchange(
                        "https://api.twitter.com/1.1/statuses/user_timeline.json?exclude_replies=true&include_rts=false&screen_name=" + handle,
                        HttpMethod.GET, entity, String.class);

            } catch (Exception ignored) {
                continue;
            }

            ObjectMapper objectMapper = new ObjectMapper();

            try {
                JsonNode items = objectMapper.readTree(response.getBody());
                Iterator<JsonNode> iterator = items.elements();

                while (iterator.hasNext()) {
                    JsonNode item = iterator.next();

                    String postId = item.path("id_str").asText();

                    SocialPost post = socialPostRepository.findFirstByFeedTypeAndPostId(feedType, postId);

                    if (post == null) {
                        post = new SocialPost();
                    }

                    String userHandle = item.path("user").path("screen_name").asText().toLowerCase();

                    SocialAccount account = socialAccountRepository.findFirstByFeedTypeAndHandle(feedType, userHandle);

                    if (account == null) {
                        continue;
                    }

                    String mediaUrl;

                    try {
                        mediaUrl = item.path("entities").path("media").get(0).path("media_url_https").asText();
                    } catch (Exception e) {
                        mediaUrl = "";
                    }

                    LocalDateTime dateTime;

                    try {
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM d HH:mm:ss ZZZ yyyy", Locale.ENGLISH);
                        dateTime = LocalDateTime.parse(item.path("created_at").asText(), formatter);
                    } catch (Exception e) {
                        dateTime = null;
                    }

                    post.setAccount(account);
                    post.setPostId(postId);
                    post.setFeedType(feedType);
                    post.setImageUrl(mediaUrl);
                    post.setDateTime(dateTime);
                    post.setText(item.path("text").asText());
                    post.setPostUrl(feedType.getUrl() + account.getHandle() + "/status/" + postId);

                    list.add(post);
                }
            } catch (IOException ignored) {
            }

        }

        socialPostRepository.saveAll(list);
    }
}
