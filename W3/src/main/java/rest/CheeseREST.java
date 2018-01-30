/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import entity.Cheese;
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
import dao.CheeseFacade;
import security.User;

/**
 *
 * @author Gerben
 */
@Path("/cheese")
@Stateless
public class CheeseREST {

    @EJB
    private CheeseFacade cheesedao;
    
    private User user =  new User();

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Cheese> findAll() {
        System.out.println(user.getUserName());
        return cheesedao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Cheese find(@PathParam("id") Integer id) {
        return cheesedao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Cheese entity) {
        cheesedao.create(entity);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Cheese entity) {
        cheesedao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        cheesedao.remove(cheesedao.find(id));
    }

}
