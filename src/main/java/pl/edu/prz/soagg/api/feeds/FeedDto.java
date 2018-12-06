package pl.edu.prz.soagg.api.feeds;

public class FeedDto {
    private String feedHandle;

    private FeedType feedType;

    private FeedCategory relatedFeedCategory;

    public String getFeedHandle() {
        return feedHandle;
    }

    public void setFeedHandle(String feedHandle) {
        this.feedHandle = feedHandle.toLowerCase();
    }

    public FeedType getFeedType() {
        return feedType;
    }

    public void setFeedType(FeedType feedType) {
        this.feedType = feedType;
    }

    public FeedCategory getRelatedFeedCategory() {
        return relatedFeedCategory;
    }

    public void setRelatedFeedCategory(FeedCategory relatedFeedCategory) {
        this.relatedFeedCategory = relatedFeedCategory;
    }
}
