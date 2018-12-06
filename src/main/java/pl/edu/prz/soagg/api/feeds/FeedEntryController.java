package pl.edu.prz.soagg.api.feeds;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;
import pl.edu.prz.soagg.api.accounts.ApplicationUserRepository;
import pl.edu.prz.soagg.api.data.SocialPost;
import pl.edu.prz.soagg.api.data.SocialPostRepository;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
public class FeedEntryController {

    private final ApplicationUserRepository applicationUserRepository;
    private final FeedRepository feedRepository;
    private final SocialPostRepository socialPostRepository;

    public FeedEntryController(ApplicationUserRepository applicationUserRepository, FeedRepository feedRepository, SocialPostRepository socialPostRepository) {
        this.applicationUserRepository = applicationUserRepository;
        this.feedRepository = feedRepository;
        this.socialPostRepository = socialPostRepository;
    }

    @GetMapping("/api/post")
    public List<SocialPost> getPosts(Principal user) {
        if (user != null) {
            ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());

            List<Feed> feeds = feedRepository.findAllByRelatedUser(applicationUser);

            List<SocialPost> list = new ArrayList<>();

            for (Feed feed : feeds) {
                List<SocialPost> posts = socialPostRepository.findAllByAccount_Handle(feed.getFeedHandle());
                list.addAll(posts);
            }

            list.sort(Comparator.comparing(SocialPost::getDateTime).reversed());

            return list;

        } else {
            return null;
        }
    }
}
