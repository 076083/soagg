package pl.edu.prz.soagg.api.feeds;

public enum FeedType {
    FEED_TWITTER("Twitter", "fab fa-twitter"),
    FEED_FACEBOOK("Facebook", "fab fa-facebook"),
    FEED_INSTAGRAM("Instagram", "fab fa-instagram");

    private final String title;
    private final String icon;

    FeedType(String title, String icon) {
        this.title = title;
        this.icon = icon;
    }

    public String getTitle() {
        return title;
    }

    public String getIcon() {
        return icon;
    }
}
