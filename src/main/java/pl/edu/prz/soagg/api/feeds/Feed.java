package pl.edu.prz.soagg.api.feeds;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;

import javax.persistence.*;
import java.util.List;

@Entity
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String feedUrl;

    @Column(columnDefinition = "TEXT")
    private String feedHandle;

    @Column(columnDefinition = "TEXT")
    private String feedName;

    @Enumerated(EnumType.STRING)
    private FeedType feedType;

    @ManyToOne
    @JsonIgnore
    private FeedsGroup relatedFeedsGroup;

    @ManyToOne
    @JsonIgnore
    private ApplicationUser relatedUser;

    @OneToMany(mappedBy = "relatedFeed", cascade = CascadeType.ALL)
    private List<FeedEntry> entries;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeedUrl() {
        return feedUrl;
    }

    public void setFeedUrl(String feedUrl) {
        this.feedUrl = feedUrl;
    }

    public String getFeedHandle() {
        return feedHandle;
    }

    public void setFeedHandle(String feedHandle) {
        this.feedHandle = feedHandle;
    }

    public String getFeedName() {
        return feedName;
    }

    public void setFeedName(String feedName) {
        this.feedName = feedName;
    }

    public FeedType getFeedType() {
        return feedType;
    }

    public void setFeedType(FeedType feedType) {
        this.feedType = feedType;
    }

    public FeedsGroup getRelatedFeedsGroup() {
        return relatedFeedsGroup;
    }

    public void setRelatedFeedsGroup(FeedsGroup relatedFeedsGroup) {
        this.relatedFeedsGroup = relatedFeedsGroup;
    }

    public ApplicationUser getRelatedUser() {
        return relatedUser;
    }

    public void setRelatedUser(ApplicationUser relatedUser) {
        this.relatedUser = relatedUser;
    }

    public List<FeedEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<FeedEntry> entries) {
        this.entries = entries;
    }
}
