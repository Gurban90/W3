/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import entity.Addresstype;
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
import dao.AddresstypeFacade;
import java.util.ArrayList;
import security.User;

/**
 *
 * @author Gerben
 */
@Path("/addresstype")
@Stateless
public class AddresstypeREST {

    private User user = new User();

    @EJB
    private AddresstypeFacade addresstypedao;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Addresstype> findAll() {
        return addresstypedao.findAll();
    }

    @GET
    @Secured
    @Path("/client")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Addresstype> findAll2() {
        if (user.getUserRole().equalsIgnoreCase("ADMIN")) {
            return addresstypedao.findAll();
        } else {
            return new ArrayList<>();
        }
    }

    @GET
    @Secured
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Addresstype find(@PathParam("id") Integer id) {
        return addresstypedao.find(id);
    }

    @POST
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Addresstype entity) {
        addresstypedao.create(entity);
    }

    @PUT
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Addresstype entity) {
        addresstypedao.edit(entity);
    }

    @DELETE
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        addresstypedao.remove(addresstypedao.find(id));
    }

}
