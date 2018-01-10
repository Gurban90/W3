/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

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

/**
 *
 * @author Gerben
 */
@Path("/account")
@Stateless
public class AccountREST {

    @EJB
    private AccountFacade accountdao;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Account> findAll() {
        return accountdao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Account find(@PathParam("id") int id) {
        return accountdao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Account entity) {
        accountdao.create(entity);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Account entity) {
        accountdao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        accountdao.remove(accountdao.find(id));
    }

}
