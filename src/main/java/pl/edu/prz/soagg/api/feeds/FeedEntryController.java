package pl.edu.prz.soagg.api.feeds;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class FeedEntryController {
    @GetMapping("/api/post")
    public List<FeedEntry> getPosts(Principal user) {
        // TODO: Auth, get feeds, get posts...
        // Currently just a test.

        List<FeedEntry> entries = new ArrayList<>();

        Feed relatedFeed = new Feed();
        relatedFeed.setFeedHandle("elonmusk");
        relatedFeed.setFeedType(FeedType.FEED_TWITTER);

        FeedEntry feedEntry = new FeedEntry();

        feedEntry.setRelatedFeed(relatedFeed);
        feedEntry.setId(1337L);
        feedEntry.setEntryDescription("Looking back at the sun from upper stage & Falcon 9 \uD83D\uDE80 landed on drone ship Of Course I Still Love You");
        feedEntry.setEntryMediaUrl("https://pbs.twimg.com/media/DsEoUm-V4AA3wBz.jpg:large");
        feedEntry.setEntrySubtitle("");
        feedEntry.setEntryTitle("Elon Musk");
        feedEntry.setEntryUrl("https://twitter.com/elonmusk/status/1063175331484319744");

        entries.add(feedEntry);
        entries.add(feedEntry);

        return entries;
    }
}
