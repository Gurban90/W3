/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.AccountFacade;
import entity.Client;
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
import dao.ClientFacade;
import entity.Account;
import java.util.ArrayList;
import security.User;

/**
 *
 * @author Gerben
 */
@Path("/client")
@Stateless
public class ClientREST {

    private User user = new User();

    @EJB
    private AccountFacade accountdao;

    @EJB
    private ClientFacade clientdao;

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Client> findAll() {
        if (user.getUserRole().equalsIgnoreCase("ADMIN")) {
            return clientdao.findAll();
        } else {
            return new ArrayList<>();
        }
    }

    @GET
    @Secured
    @Path("/client")
    @Produces({MediaType.APPLICATION_JSON})
    public Client find2() {
        if (user.getUserRole().equalsIgnoreCase("USER")) {
            int id = user.getUserID();
            return clientdao.find(accountdao.find(id).getClientID().getClientID());
        } else {
            return new Client();
        }
    }

    @GET
    @Secured
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Client find(@PathParam("id") Integer id) {
        return clientdao.find(id);
    }

    @POST
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Client create(Client entity) {
        clientdao.create(entity);
        return entity;
    }

    @POST
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Client create(Client entity, @PathParam("id") Integer id) {
        clientdao.create(entity);
        Account account = accountdao.find(id);
        account.setClientID(entity);
        return entity;
    }

    @PUT
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Client entity) {
        clientdao.edit(entity);
    }

    @DELETE
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        clientdao.remove(clientdao.find(id));
    }

}
