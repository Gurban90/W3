/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.AccountFacade;
import entity.Account;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.crypto.KeyGenerator;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.jasypt.util.password.BasicPasswordEncryptor;

/**
 *
 * @author Gerben
 */
@Path("/authentication")
@Stateless
public class AuthenticationREST {

    private static final Key key = generateKey();

    @EJB
    private AccountFacade accountdao;

    @POST
    @Produces("text/plain")
    @Consumes("application/json")
    public String authenticateUser(Account account) {

        String username = account.getUsername();
        String password = account.getPassword();

        if (authenticate(username, password) == true) {

            String token = issueToken(username);

            return token;

        } else {
            return "Password or Username not correct.";
        }

    }

    private boolean authenticate(String username, String password) {
        BasicPasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
        Account account = (Account) accountdao.findByUsername(username);
        boolean result = passwordEncryptor.checkPassword(password, account.getPassword());
        return result;
    }

    private String issueToken(String username) {
        // Issue a token (can be a random String persisted to a database or a JWT token)
        // The issued token must be associated to a user
        // Return the issued token
        Account account = (Account) accountdao.findByUsername(username);
        generateKey();
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.add(Calendar.DATE, 2);
        Date expirationDate = calendar.getTime();

        String compactJws = Jwts.builder()
                .setSubject(account.getTheRole())
                .setId(username)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        if (verifyJwt(compactJws)) {
            return compactJws;
        } else {
            return null;
        }

    }

    private static Key generateKey() {
        try {
            return KeyGenerator.getInstance("HmacSHA256").generateKey();
        } catch (NoSuchAlgorithmException ex) {
            System.err.println(ex.getMessage());
        }
        return null;
    }

    public boolean verifyJwt(String compactJws) {
        try {
            if (key == null) {
                return false;
            }
            Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws);
            return true;
        } catch (SignatureException e) {
            //TODO: log exception
            return false;
        }
    }

}
