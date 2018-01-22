/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.Address;
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
import dao.AddressFacade;
import dao.AddresstypeFacade;
import dao.ClientFacade;
import entity.Addresstype;
import entity.Client;

@Path("/address")
@Stateless
public class AddressREST {

    @EJB
    private AddressFacade addressdao;

    @EJB
    private AddresstypeFacade addresstypedao;

    @EJB
    private ClientFacade clientdao;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Address> findAll() {
        return addressdao.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Address find(@PathParam("id") Integer id) {
        return addressdao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Address entity) {
        Client client = clientdao.find(entity.getClientID().getClientID());
        Addresstype addresstype = addresstypedao.find(entity.getAddresstypeID().getAddresstypeID());
        entity.setAddresstypeID(addresstype);
        entity.setClientID(client);
        addressdao.create(entity);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Address entity) {
        System.out.println(entity.getCity());
        Client client = clientdao.find(entity.getClientID().getClientID());
        Addresstype addresstype = addresstypedao.find(entity.getAddresstypeID().getAddresstypeID());
        entity.setAddresstypeID(addresstype);
        entity.setClientID(client);
        addressdao.edit(entity);
    }

    @DELETE
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        addressdao.remove(addressdao.find(id));
    }

}
