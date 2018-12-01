package pl.edu.prz.soagg.api.socialmedias;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class ApiKeysRepository {
    private static String API_KEY_TWITTER;
    private static String API_KEY_FACEBOOK;
    private static String API_KEY_INSTAGRAM;

    private final Environment environment;

    public ApiKeysRepository(Environment environment) {
        this.environment = environment;
        API_KEY_TWITTER = environment.getProperty("API_KEY_TWITTER");
        API_KEY_FACEBOOK = environment.getProperty("API_KEY_FACEBOOK");
        API_KEY_INSTAGRAM = environment.getProperty("API_KEY_INSTAGRAM");
    }

    public static boolean checkForKeys() {
        return !(API_KEY_TWITTER == null || API_KEY_TWITTER.isEmpty() ||
                API_KEY_FACEBOOK == null || API_KEY_FACEBOOK.isEmpty() ||
                API_KEY_INSTAGRAM == null || API_KEY_INSTAGRAM.isEmpty());
    }
}
