package pl.edu.prz.soagg.api.feeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;
import pl.edu.prz.soagg.api.accounts.ApplicationUserRepository;
import pl.edu.prz.soagg.api.exceptions.FeedAlreadyExistsException;
import pl.edu.prz.soagg.api.exceptions.NotAuthorizedException;

import java.security.Principal;
import java.util.List;

@RestController
public class FeedController {

    private final FeedRepository feedRepository;
    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public FeedController(FeedRepository feedRepository, ApplicationUserRepository applicationUserRepository) {
        this.feedRepository = feedRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    @PostMapping("/api/feed")
    public void addFeed(Principal user, @RequestBody FeedDTO feedDTO) throws FeedAlreadyExistsException {
        if (feedRepository.existsByFeedTypeAndFeedHandle(feedDTO.getFeedType(), feedDTO.getFeedHandle())) {
            throw new FeedAlreadyExistsException();
        } else {
            Feed newFeed = new Feed();
            ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());

            newFeed.setFeedType(feedDTO.getFeedType());
            newFeed.setFeedHandle(feedDTO.getFeedHandle());
            newFeed.setRelatedFeedCategory(feedDTO.getRelatedFeedCategory());
            newFeed.setRelatedUser(applicationUser);

            feedRepository.save(newFeed);
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
