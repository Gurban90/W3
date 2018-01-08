/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.Orderdetail;
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
import session.OrderdetailFacade;

/**
 *
 * @author Gerben
 */
@Path("/orderdetail")
@Stateless
public class OrderdetailREST {

    @EJB
    private OrderdetailFacade orderdetaildao;

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Orderdetail> findAll() {
        return orderdetaildao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Orderdetail find(@PathParam("id") Integer id) {
        return orderdetaildao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Orderdetail entity) {
        orderdetaildao.create(entity);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(Orderdetail entity) {
        orderdetaildao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
     @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        orderdetaildao.remove(orderdetaildao.find(id));
    }

}
