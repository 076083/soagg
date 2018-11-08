package pl.edu.prz.soagg.api.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.prz.soagg.api.exceptions.UserAlreadyExistsException;

import java.security.Principal;

@RestController
public class ApplicationUserController {

    private final ApplicationUserRepository applicationUserRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationUserController(ApplicationUserRepository applicationUserRepository, BCryptPasswordEncoder passwordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/user")
    public String getUser(Principal user) {
        if (user != null) {
            return user.getName();
        } else {
            return "";
        }
    }

    @PostMapping("/api/user")
    public void createUser(@RequestBody ApplicationUserDto applicationUserDto) {

        if (applicationUserRepository.findByUsername(applicationUserDto.getUsername()) == null) {
            ApplicationUser newApplicationUser = new ApplicationUser(
                    applicationUserDto.getUsername(),
                    passwordEncoder.encode(applicationUserDto.getPassword())
            );

            applicationUserRepository.save(newApplicationUser);
        } else {
            throw new UserAlreadyExistsException();
        }

    }


}
