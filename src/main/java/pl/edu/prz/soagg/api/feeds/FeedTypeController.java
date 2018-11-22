package pl.edu.prz.soagg.api.feeds;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
public class FeedTypeController {

    @GetMapping("/api/feed/types")
    public ArrayList<HashMap<String, String>> getFeedTypes() {
        return Arrays
                .stream(FeedType.values())
                .collect(
                        ArrayList<HashMap<String, String>>::new,

                        (list, item) -> {
                            HashMap<String, String> hashMap = new HashMap<>();

                            hashMap.put("id", item.toString());
                            hashMap.put("title", item.getTitle());
                            hashMap.put("icon", item.getIcon());

                            list.add(hashMap);
                        },

                        List::addAll
                );
    }
}
