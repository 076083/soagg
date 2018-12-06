package pl.edu.prz.soagg.api.data;

import org.springframework.data.repository.CrudRepository;
import pl.edu.prz.soagg.api.feeds.FeedType;

public interface SocialAccountRepository extends CrudRepository<SocialAccount, Long> {
    SocialAccount findFirstByFeedTypeAndHandle(FeedType feedType, String handle);
}
