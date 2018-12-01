package pl.edu.prz.soagg.api.feeds;

import org.springframework.data.repository.CrudRepository;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;

import java.util.List;

public interface FeedRepository extends CrudRepository<Feed, Long> {
    boolean existsByRelatedUser_UsernameAndFeedTypeAndFeedHandle(String username, FeedType feedType, String feedHandle);

    List<Feed> findAllByRelatedUser(ApplicationUser applicationUser);
}
