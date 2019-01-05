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
    private String feedHandle;

    @Enumerated(EnumType.STRING)
    private FeedType feedType;

    @ManyToOne
    private FeedCategory relatedFeedCategory;

    @ManyToOne
    @JsonIgnore
    private ApplicationUser relatedUser;

    @JsonIgnore
    @OneToMany(mappedBy = "relatedFeed", cascade = CascadeType.ALL)
    private List<FeedEntry> entries;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeedHandle() {
        return feedHandle;
    }

    public void setFeedHandle(String feedHandle) {
        this.feedHandle = feedHandle;
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
