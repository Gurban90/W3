/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.AccountFacade;
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
import entity.Account;
import entity.Address;
import entity.Cheese;
import entity.Client;
import entity.Orderdetail;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import security.User;
import security.OrdersService;

/**
 *
 * @author Gerben
 */
@Path("/orders")
@Stateless
public class OrdersREST {
    
    private OrdersService ordersService = new OrdersService();

    private User user = new User();

    @EJB
    private OrdersFacade ordersdao;

    @EJB
    private ClientFacade clientdao;

    @EJB
    private OrderdetailFacade orderdetaildao;

    @EJB
    private AccountFacade accountdao;

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Orders> findAll() {
        if (user.getUserRole().equalsIgnoreCase("ADMIN")) {
            return ordersdao.findAll();
        } else {
            return new ArrayList<>();
        }
    }
    
    @GET
    @Secured
    @Path("/client")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection<Orders> findAll2() {
        if (user.getUserRole().equalsIgnoreCase("USER")) {
            int id = user.getUserID();
            Client client = clientdao.find(accountdao.find(id).getClientID().getClientID());
            return client.getOrdersCollection();
        } else {
            return new ArrayList<>();
        }
    }
    

    @GET
    @Secured
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Orders find(@PathParam("id") Integer id) {
        return ordersdao.find(id);
    }

    @POST
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Orders create(Orders entity) {
        int id = user.getUserID();
        Client client = clientdao.find(accountdao.find(id).getClientID().getClientID());
        entity.setCurrentdate(new Date());
        entity.setTotalprice(BigDecimal.ZERO);
        entity.setEnddate(ordersService.setFutureDate());
        entity.setClientID(client);
        ordersdao.create(entity);

        Collection<Orders> ordersCollection = client.getOrdersCollection();
        ordersCollection.add(entity);
        client.setOrdersCollection(ordersCollection);
        clientdao.edit(client);
        return entity;
    }

    @PUT
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Orders entity) {
        Account account = accountdao.find(user.getUserID());
        Client client = clientdao.find(account.getClientID().getClientID());
        Orders order = ordersdao.find(entity.getOrdersID());
        ordersdao.edit(entity);
        client.getOrdersCollection().remove(order);
        client.getOrdersCollection().add(entity);
        clientdao.edit(client);
    }

    @DELETE
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        Account account = accountdao.find(user.getUserID());
        Client client = clientdao.find(account.getClientID().getClientID());
        client.getOrdersCollection().remove(ordersdao.find(id));
        clientdao.edit(client);
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
