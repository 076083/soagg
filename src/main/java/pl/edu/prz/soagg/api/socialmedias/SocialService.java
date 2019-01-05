package pl.edu.prz.soagg.api.socialmedias;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class SocialService {
    private final TwitterService twitterService;

    private LocalDateTime lastRefresh = LocalDateTime.MIN;

    public SocialService(TwitterService twitterService) {
        this.twitterService = twitterService;
    }

    @Scheduled(initialDelay = 5 * 1000, fixedDelay = 30 * 60 * 1000)
    public void updateAll() {
        long minutesSinceRefresh = ChronoUnit.MINUTES.between(lastRefresh, LocalDateTime.now());

        if (minutesSinceRefresh < 3) {
            return;
        }

        lastRefresh = LocalDateTime.now();

        twitterService.getTwitterAccounts();
        twitterService.getTwitterPosts();
    }

    public void needsRefresh() {
        lastRefresh = LocalDateTime.MIN;
    }
}
