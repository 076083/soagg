package pl.edu.prz.soagg.api.feeds;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class FeedEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Feed relatedFeed;

    @Column(columnDefinition = "TEXT")
    private String entryTitle;

    @Column(columnDefinition = "TEXT")
    private String entryUrl;

    @Column(columnDefinition = "TEXT")
    private String entrySubtitle;

    @Column(columnDefinition = "TEXT")
    private String entryDescription;

    @Column(columnDefinition = "TEXT")
    private String entryMediaUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Feed getRelatedFeed() {
        return relatedFeed;
    }

    public void setRelatedFeed(Feed relatedFeed) {
        this.relatedFeed = relatedFeed;
    }

    public String getEntryTitle() {
        return entryTitle;
    }

    public void setEntryTitle(String entryTitle) {
        this.entryTitle = entryTitle;
    }

    public String getEntryUrl() {
        return entryUrl;
    }

    public void setEntryUrl(String entryUrl) {
        this.entryUrl = entryUrl;
    }

    public String getEntrySubtitle() {
        return entrySubtitle;
    }

    public void setEntrySubtitle(String entrySubtitle) {
        this.entrySubtitle = entrySubtitle;
    }

    public String getEntryDescription() {
        return entryDescription;
    }

    public void setEntryDescription(String entryDescription) {
        this.entryDescription = entryDescription;
    }

    public String getEntryMediaUrl() {
        return entryMediaUrl;
    }

    public void setEntryMediaUrl(String entryMediaUrl) {
        this.entryMediaUrl = entryMediaUrl;
    }
}
