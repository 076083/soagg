package pl.edu.prz.soagg.api.feeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;
import pl.edu.prz.soagg.api.accounts.ApplicationUserRepository;
import pl.edu.prz.soagg.api.exceptions.FeedAlreadyExistsException;
import pl.edu.prz.soagg.api.exceptions.NotAuthorizedException;
import pl.edu.prz.soagg.api.socialmedias.SocialService;

import java.security.Principal;
import java.util.List;

@RestController
public class FeedController {

    private final FeedRepository feedRepository;
    private final SocialService socialService;
    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public FeedController(FeedRepository feedRepository, SocialService socialService, ApplicationUserRepository applicationUserRepository) {
        this.feedRepository = feedRepository;
        this.socialService = socialService;
        this.applicationUserRepository = applicationUserRepository;
    }

    @PostMapping("/api/feed")
    public void addFeed(Principal user, @RequestBody FeedDto feedDTO) throws FeedAlreadyExistsException {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());

        if (feedRepository.existsByRelatedUser_UsernameAndFeedTypeAndFeedHandle(applicationUser.getUsername(), feedDTO.getFeedType(), feedDTO.getFeedHandle())) {
            throw new FeedAlreadyExistsException();
        } else {
            Feed newFeed = new Feed();

            newFeed.setFeedType(feedDTO.getFeedType());
            newFeed.setFeedHandle(feedDTO.getFeedHandle());
            newFeed.setRelatedFeedCategory(feedDTO.getRelatedFeedCategory());
            newFeed.setRelatedUser(applicationUser);

            feedRepository.save(newFeed);

            socialService.needsRefresh();
        }
    }

    @GetMapping("/api/feed")
    public List<Feed> getFeeds(Principal user) {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());
        return feedRepository.findAllByRelatedUser(applicationUser);
    }

    @DeleteMapping("/api/feed/{id}")
    public void deleteFeed(Principal user, @PathVariable Long id) {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());
        Feed feed = feedRepository.findById(id).orElse(new Feed());

        if (feed.getRelatedUser() == applicationUser) {
            feedRepository.deleteById(id);
        } else {
            throw new NotAuthorizedException();
        }
    }
}
