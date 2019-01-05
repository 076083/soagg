package pl.edu.prz.soagg.api.feeds;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.edu.prz.soagg.api.accounts.ApplicationUser;

import javax.persistence.*;
import java.util.List;

@Entity
public class FeedCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String categoryName;

    @OneToMany(mappedBy = "relatedFeedCategory", cascade = CascadeType.DETACH)
    @JsonIgnore
    private List<Feed> feeds;

    @ManyToOne
    @JsonIgnore
    private ApplicationUser relatedUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Feed> getFeeds() {
        return feeds;
    }

    public void setFeeds(List<Feed> feeds) {
        this.feeds = feeds;
    }

    public ApplicationUser getRelatedUser() {
        return relatedUser;
    }

    public void setRelatedUser(ApplicationUser relatedUser) {
        this.relatedUser = relatedUser;
    }
}
