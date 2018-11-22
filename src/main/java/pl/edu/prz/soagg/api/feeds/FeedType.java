package pl.edu.prz.soagg.api.feeds;

public enum FeedType {
    FEED_TWITTER("Twitter", "fab fa-twitter", "https://twitter.com/"),
    FEED_FACEBOOK("Facebook", "fab fa-facebook", "https://www.facebook.com/"),
    FEED_INSTAGRAM("Instagram", "fab fa-instagram", "https://www.instagram.com/");

    private final String title;
    private final String icon;
    private final String url;

    FeedType(String title, String icon, String url) {
        this.title = title;
        this.icon = icon;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public String getIcon() {
        return icon;
    }

    public String getUrl() {
        return url;
    }
}
