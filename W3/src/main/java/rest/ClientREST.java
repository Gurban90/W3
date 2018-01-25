/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

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

/**
 *
 * @author Gerben
 */
@Path("/client")
@Stateless
public class ClientREST {

    @EJB
    private ClientFacade clientdao;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Client> findAll() {
        return clientdao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Client find(@PathParam("id") Integer id) {
        return clientdao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Client entity) {
        clientdao.create(entity);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Client entity) {
        clientdao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        clientdao.remove(clientdao.find(id));
    }

}
