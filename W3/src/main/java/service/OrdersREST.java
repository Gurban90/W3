/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.Orders;
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
import dao.OrdersFacade;
import entity.Client;
import static java.math.BigDecimal.ZERO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 *
 * @author Gerben
 */
@Path("/orders")
@Stateless
public class OrdersREST {

    @EJB
    private OrdersFacade ordersdao;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Orders> findAll() {
        return ordersdao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Orders find(@PathParam("id") Integer id) {
        return ordersdao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Orders entity) {
        Client client = new Client();
        client.setClientID(16);
        Date today=new Date();
        long ltime=today.getTime()+7*24*60*60*1000;
        entity.setCurrentdate(new Date());
        entity.setEnddate(new Date(ltime));
        entity.setTotalprice("0");
        entity.setClientID(client);
        ordersdao.create(entity);
    }
    

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Orders entity) {
        ordersdao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        ordersdao.remove(ordersdao.find(id));
    }

}
