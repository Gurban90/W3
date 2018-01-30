/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.io.IOException;
import java.security.Key;
import javax.annotation.Priority;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import rest.AuthenticationREST;
import rest.Secured;

/**
 *
 * @author Gerben
 */
@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {
    
    

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        // Get the HTTP Authorization header from the request
        String authorizationHeader
                = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // Check if the HTTP Authorization header is present and formatted correctly
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new NotAuthorizedException("Authorization header must be provided");
        }

        // Extract the token from the HTTP Authorization header
        String token = authorizationHeader.substring("Bearer".length()).trim();

        try {

            setInfo(token);
            // Validate the token
            validateToken(token);

        } catch (Exception e) {
            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }

    private void validateToken(String token) throws Exception {
        Key theKey = AuthenticationREST.key;

        Jwts.parser().setSigningKey(theKey).parseClaimsJws(token);

    }

    private void setInfo(String token) {

        Claims claims = getClaims(token);
        int Userid = Integer.parseInt(claims.getId());
        String userName = claims.getIssuer();
        String Role = claims.getSubject();
        User user = new User();
        user.AuthenticatedUserDetails(Userid, userName, Role);
    }

    private Claims getClaims(String jws) {
        Key theKey = AuthenticationREST.key;
        return Jwts.parser().setSigningKey(theKey).parseClaimsJws(jws).getBody();
    }

}
