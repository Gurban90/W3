/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.ClientFacade;
import dao.OrderdetailFacade;
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
import entity.Cheese;
import entity.Client;
import entity.Orderdetail;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Iterator;
import service.OrdersService;

/**
 *
 * @author Gerben
 */
@Path("/orders")
@Stateless
public class OrdersREST {

    @EJB
    private OrdersFacade ordersdao;

    @EJB
    private ClientFacade clientdao;
    
    @EJB
    private OrderdetailFacade orderdetaildao;

    private OrdersService ordersService = new OrdersService();

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
    @Produces({MediaType.APPLICATION_JSON})
    public Orders create(Orders entity) {
        Client client = new Client();
        client.setClientID(19);
        entity.setCurrentdate(ordersService.setDate());
        entity.setTotalprice(BigDecimal.ZERO);
        entity.setEnddate(ordersService.setFutureDate());
        entity.setClientID(client);
        ordersdao.create(entity);

        Client a = clientdao.find(19);
        Collection<Orders> ordersCollection = a.getOrdersCollection();
        ordersCollection.add(entity);
        a.setOrdersCollection(ordersCollection);
        clientdao.edit(a);
        return entity;
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
        Orderdetail Orderdetail = new Orderdetail();
        Collection<Orderdetail> orderdetailCollection = ordersdao.find(id).getOrderdetailCollection();
        Iterator<Orderdetail> iterator = orderdetailCollection.iterator();
        while (iterator.hasNext()) {
            Orderdetail = iterator.next();
            int detailid = Orderdetail.getOrderdetailID();
            int q = Orderdetail.getQuantity();
            deleteCheeseOrder(detailid, q);
        }
        ordersdao.remove(ordersdao.find(id));

    }
    
     public void deleteCheeseOrder(int OrderDetailID, int quantity) {
        Orderdetail Orderdetail = orderdetaildao.find(OrderDetailID);
        int q = quantity;

        Cheese cheese = Orderdetail.getCheeseID();
        int stock = Integer.parseInt(cheese.getStock());
        int stock2 = (stock + quantity);
        cheese.setStock(new Integer(stock2).toString());

        Orders order = Orderdetail.getOrdersID();
        BigDecimal quantityBD = new BigDecimal(q);
        order.setTotalprice(order.getTotalprice().subtract(quantityBD.multiply(cheese.getPrice())));
                
    }

}
