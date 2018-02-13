/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.CheeseFacade;
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
import entity.Cheese;
import entity.Orders;
import java.math.BigDecimal;
import java.util.Collection;
import security.User;

/**
 *
 * @author Gerben
 */
@Path("/orderdetail")
@Stateless
public class OrderdetailREST {
    
    private User user = new User();

    @EJB
    private OrderdetailFacade orderdetaildao;

    @EJB
    private OrdersFacade orderdao;

    @EJB
    private CheeseFacade cheesedao;

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Orderdetail> findAll() {
        return orderdetaildao.findAll();
    }

    @GET
    @Secured
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Orderdetail find(@PathParam("id") Integer id) {
        return orderdetaildao.find(id);
    }

    @POST
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(@PathParam("id") Integer id, Orderdetail entity) {
        Orders a = orderdao.find(id);
        entity.setOrdersID(a);
        orderdetaildao.create(entity);
        setCheeseOrder(id, entity.getCheeseID().getCheeseID(), entity.getQuantity());
        Collection<Orderdetail> coll = a.getOrderdetailCollection();
        coll.add(entity);
        a.setOrderdetailCollection(coll);
        orderdao.edit(a);
    }

    @PUT
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Orderdetail entity) {
        editCheeseOrder(entity);
        Orderdetail detail = orderdetaildao.find(entity.getOrderdetailID());
        detail.setQuantity(entity.getQuantity());
        orderdetaildao.edit(detail);
    }

    @DELETE
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        Orderdetail detail = orderdetaildao.find(id);
        deleteCheeseOrder(id, detail.getQuantity());
        orderdetaildao.remove(orderdetaildao.find(id));
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

    public void editCheeseOrder(Orderdetail orderDetail) {
        Orderdetail orderDetail1 = orderdetaildao.find(orderDetail.getOrderdetailID());

        if (orderDetail1.getQuantity() <= orderDetail.getQuantity()) {
            int extraQuantity = orderDetail.getQuantity() - orderDetail1.getQuantity();
            int orderID = orderDetail1.getOrdersID().getOrdersID();
            int cheeseID = orderDetail.getCheeseID().getCheeseID();
            setCheeseOrder(orderID, cheeseID, extraQuantity);
        } else {
            int minQuantity = orderDetail1.getQuantity() - orderDetail.getQuantity();
            deleteCheeseOrder(orderDetail.getOrderdetailID(), minQuantity);
        }
    }

    public void setCheeseOrder(int orderID, int cheeseID, int quantity) {
        Cheese cheese = cheesedao.find(cheeseID);
        int stock = Integer.parseInt(cheese.getStock());
        int stock2 = (stock - quantity);
        cheese.setStock(new Integer(stock2).toString());

        Orders order = orderdao.find(orderID);
        BigDecimal quantityBD = new BigDecimal(quantity);
        order.setTotalprice(order.getTotalprice().add(quantityBD.multiply(cheese.getPrice())));
        cheesedao.edit(cheese);
        orderdao.edit(order);
    }

}
