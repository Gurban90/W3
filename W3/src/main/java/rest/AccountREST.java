/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import entity.Account;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import dao.AccountFacade;
import entity.Cheese;
import java.util.ArrayList;
import security.User;
import service.AccountService;

/**
 *
 * @author Gerben
 */
@Path("/account")
@Stateless
public class AccountREST {

    @EJB
    private AccountFacade accountdao;

    AccountService pservice = new AccountService();

    private User user = new User();

    @GET
    @Path("/index")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Account> findAll3() {
        return accountdao.findAll();
    }

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Account> findAll() {
        if (user.getUserRole().equalsIgnoreCase("ADMIN")) {
            return accountdao.findAll();
        } else {
            return new ArrayList<>();
        }
    }

    @GET
    @Secured
    @Path("/client")
    @Produces({MediaType.APPLICATION_JSON})
    public Account findClient() {
        if (user.getUserRole().equalsIgnoreCase("USER")) {
            int id = user.getUserID();
            return accountdao.find(id);
        } else {
            return new Account();
        }
    }

    @GET
    @Secured
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Account find(@PathParam("id") int id) {
        return accountdao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Account create(Account entity) {
        entity.setPassword(pservice.setPassword(entity.getPassword()));
        accountdao.create(entity);
        return entity;
    }

    @PUT
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Account entity) {
        accountdao.edit(entity);
    }

    @DELETE
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        accountdao.remove(accountdao.find(id));
    }
   
}
