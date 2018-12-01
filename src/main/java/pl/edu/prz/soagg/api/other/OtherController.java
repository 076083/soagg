package pl.edu.prz.soagg.api.other;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OtherController {
    @GetMapping("/underconstruction")
    public String underContruction() {
        return "underconstruction.html";
    }
}
