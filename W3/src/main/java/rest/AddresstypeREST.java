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

/**
 *
 * @author Gerben
 */
@Path("/addresstype")
@Stateless
public class AddresstypeREST {

    @EJB
    private AddresstypeFacade addresstypedao;

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Addresstype> findAll() {
        return addresstypedao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Addresstype find(@PathParam("id") Integer id) {
        return addresstypedao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Addresstype entity) {
        addresstypedao.create(entity);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Addresstype entity) {
        addresstypedao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        addresstypedao.remove(addresstypedao.find(id));
    }

}
