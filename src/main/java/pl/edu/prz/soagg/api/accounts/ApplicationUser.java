package pl.edu.prz.soagg.api.accounts;

import pl.edu.prz.soagg.api.feeds.Feed;
import pl.edu.prz.soagg.api.feeds.FeedsGroup;

import javax.persistence.*;
import java.util.List;

@Entity
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String username;

    @Column(columnDefinition = "TEXT")
    private String passwordHash;

    private Boolean active;

    @Column(columnDefinition = "TEXT")
    private String role;

    @OneToMany(mappedBy = "relatedUser", cascade = CascadeType.ALL)
    private List<Feed> userFeeds;

    @OneToMany(mappedBy = "relatedUser", cascade = CascadeType.ALL)
    private List<FeedsGroup> userCategories;

    public ApplicationUser() {
        this.username = null;
    }

    public ApplicationUser(String username, String passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.active = true;
        this.role = "USER";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Feed> getUserFeeds() {
        return userFeeds;
    }

    public void setUserFeeds(List<Feed> userFeeds) {
        this.userFeeds = userFeeds;
    }

    public List<FeedsGroup> getUserCategories() {
        return userCategories;
    }

    public void setUserCategories(List<FeedsGroup> userCategories) {
        this.userCategories = userCategories;
    }
}
