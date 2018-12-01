package pl.edu.prz.soagg.configurations;

import org.springframework.web.servlet.HandlerInterceptor;
import pl.edu.prz.soagg.api.socialmedias.ApiKeysRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (!ApiKeysRepository.checkForKeys() && !request.getRequestURI().startsWith("/underconstruction.html")) {
            response.sendRedirect("/underconstruction.html");
        }

        if (ApiKeysRepository.checkForKeys() && request.getRequestURI().startsWith("/underconstruction.html")) {
            response.sendRedirect("/");
        }

        return true;
    }
}
