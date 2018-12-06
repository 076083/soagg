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
import pl.edu.prz.soagg.api.feeds.Feed;
import pl.edu.prz.soagg.api.feeds.FeedRepository;
import pl.edu.prz.soagg.api.feeds.FeedType;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class TwitterService {
    private static final FeedType feedType = FeedType.FEED_TWITTER;

    private final SocialAccountRepository socialAccountRepository;
    private final FeedRepository feedRepository;

    public TwitterService(SocialAccountRepository socialAccountRepository, FeedRepository feedRepository) {
        this.socialAccountRepository = socialAccountRepository;
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
}
