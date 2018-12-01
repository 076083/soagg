package pl.edu.prz.soagg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SoaggApplication {

    public static void main(String[] args) {
        SpringApplication.run(SoaggApplication.class, args);
    }
}
