package pl.edu.prz.soagg.api.data;

import org.springframework.data.repository.CrudRepository;
import pl.edu.prz.soagg.api.feeds.FeedType;

import java.util.List;

public interface SocialPostRepository extends CrudRepository<SocialPost, Long> {
    SocialPost findFirstByFeedTypeAndPostId(FeedType feedType, String postId);

    List<SocialPost> findAllByAccount_Handle(String postId);
}

