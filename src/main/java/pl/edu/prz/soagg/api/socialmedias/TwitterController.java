package pl.edu.prz.soagg.api.socialmedias;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URISyntaxException;

@RestController
public class TwitterController {

    @GetMapping("/api/test")
    public String getTwitterAccounts() throws URISyntaxException {

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + ApiKeysRepository.getApiKeyTwitter());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        HttpEntity<String> response = restTemplate.exchange("https://api.twitter.com/1.1/users/lookup.json?user_id=783214,6253282", HttpMethod.GET, entity, String.class);
        return response.getBody();

        /*
         * profile_image_url_https
         * name
         * screen_name
         * location
         *
         * also set profile url
         * */
    }
}
