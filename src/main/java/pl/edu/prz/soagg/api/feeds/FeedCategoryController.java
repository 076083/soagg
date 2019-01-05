package pl.edu.prz.soagg.api.feeds;

import org.springframework.web.bind.annotation.*;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;
import pl.edu.prz.soagg.api.accounts.ApplicationUserRepository;
import pl.edu.prz.soagg.api.exceptions.NotAuthorizedException;

import java.security.Principal;
import java.util.List;

@RestController
public class FeedCategoryController {

    private final ApplicationUserRepository applicationUserRepository;
    private final FeedCategoryRepository feedCategoryRepository;
    private final FeedRepository feedRepository;

    public FeedCategoryController(ApplicationUserRepository applicationUserRepository, FeedCategoryRepository feedCategoryRepository, FeedRepository feedRepository) {
        this.applicationUserRepository = applicationUserRepository;
        this.feedCategoryRepository = feedCategoryRepository;
        this.feedRepository = feedRepository;
    }

    @GetMapping("/api/category")
    public List<FeedCategory> getCategories(Principal user) {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());
        return feedCategoryRepository.findAllByRelatedUser(applicationUser);
    }

    @PostMapping("/api/category")
    public void addCategory(Principal user, @RequestBody FeedCategoryDto feedCategoryDto) {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());

        if (applicationUser != null) {
            FeedCategory newFeedCategory = new FeedCategory();
            newFeedCategory.setCategoryName(feedCategoryDto.getCategoryName());
            newFeedCategory.setRelatedUser(applicationUser);

            feedCategoryRepository.save(newFeedCategory);
        }
    }

    @DeleteMapping("/api/category/{id}")
    public void deleteCategory(Principal user, @PathVariable Long id) {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());
        FeedCategory feedCategory = feedCategoryRepository.findById(id).orElse(new FeedCategory());

        if (feedCategory.getRelatedUser() == applicationUser) {
            for (Feed feed : feedCategory.getFeeds()) {
                feed.setRelatedFeedCategory(null);
            }
            feedCategoryRepository.deleteById(id);
        } else {
            throw new NotAuthorizedException();
        }
    }

    @PutMapping("/api/category/{feedId}/{categoryId}")
    public void setCategory(Principal user, @PathVariable Long feedId, @PathVariable Long categoryId) {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(user.getName());
        FeedCategory feedCategory = feedCategoryRepository.findById(categoryId).orElse(null);
        Feed feed = feedRepository.findById(feedId).orElse(new Feed());

        if (feed.getRelatedUser() == applicationUser) {
            feed.setRelatedFeedCategory(feedCategory);
            feedRepository.save(feed);
        } else {
            throw new NotAuthorizedException();
        }
    }
}
