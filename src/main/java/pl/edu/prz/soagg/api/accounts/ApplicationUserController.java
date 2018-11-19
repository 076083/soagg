package pl.edu.prz.soagg.api.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.prz.soagg.api.exceptions.UserAlreadyExistsException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @GetMapping("/api/logout")
    public void logOut(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }


}
