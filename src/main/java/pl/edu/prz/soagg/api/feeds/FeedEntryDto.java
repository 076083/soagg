package pl.edu.prz.soagg.api.feeds;

import pl.edu.prz.soagg.api.data.SocialAccount;
import pl.edu.prz.soagg.api.data.SocialPost;

public class FeedEntryDto {
    private FeedType feedType;

    private SocialAccount account;

    private SocialPost post;

    public FeedType getFeedType() {
        return feedType;
    }

    public void setFeedType(FeedType feedType) {
        this.feedType = feedType;
    }

    public SocialAccount getAccount() {
        return account;
    }

    public void setAccount(SocialAccount account) {
        this.account = account;
    }

    public SocialPost getPost() {
        return post;
    }

    public void setPost(SocialPost post) {
        this.post = post;
    }
}
