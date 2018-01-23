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
import dao.OrderdetailFacade;
import dao.OrdersFacade;
import entity.Orders;
import java.util.Collection;

/**
 *
 * @author Gerben
 */
@Path("/orderdetail")
@Stateless
public class OrderdetailREST {

    @EJB
    private OrderdetailFacade orderdetaildao;

    @EJB
    private OrdersFacade orderdao;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Orderdetail> findAll() {
        return orderdetaildao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Orderdetail find(@PathParam("id") Integer id) {
        return orderdetaildao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Orderdetail entity) {
        orderdetaildao.create(entity);
        Orders a = orderdao.find(entity.getOrdersID().getOrdersID());
        Collection<Orderdetail> coll = a.getOrderdetailCollection();
        coll.add(entity);
        a.setOrderdetailCollection(coll);
        orderdao.edit(a);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Orderdetail entity) {
        orderdetaildao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        orderdetaildao.remove(orderdetaildao.find(id));
    }

}
