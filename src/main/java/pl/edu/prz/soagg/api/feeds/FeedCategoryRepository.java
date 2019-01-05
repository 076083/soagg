package pl.edu.prz.soagg.api.feeds;

import org.springframework.data.repository.CrudRepository;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;

import java.util.List;

public interface FeedCategoryRepository extends CrudRepository<FeedCategory, Long> {
    List<FeedCategory> findAllByRelatedUser(ApplicationUser applicationUser);
}
