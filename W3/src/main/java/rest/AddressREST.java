/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.AccountFacade;
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
import entity.Account;
import entity.Addresstype;
import entity.Client;
import java.util.ArrayList;
import java.util.Collection;
import security.User;

@Path("/address")
@Stateless
public class AddressREST {

    @EJB
    private AddressFacade addressdao;

    @EJB
    private AddresstypeFacade addresstypedao;

    @EJB
    private ClientFacade clientdao;

    @EJB
    private AccountFacade accountdao;

    private User user = new User();

    @GET
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public List<Address> findAll() {
        if (user.getUserRole().equalsIgnoreCase("ADMIN")) {
            return addressdao.findAll();
        } else {
            return new ArrayList<>();
        }
    }

    @GET
    @Secured
    @Path("/client")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection<Address> findAll2() {
        if (user.getUserRole().equalsIgnoreCase("USER")) {
            Account account = accountdao.find(user.getUserID());
            Client client = clientdao.find(account.getClientID().getClientID());
            return client.getAddressCollection();
        } else {
            return new ArrayList<>();
        }
    }

    @GET
    @Secured
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Address find(@PathParam("id") Integer id) {
        return addressdao.find(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Address entity) {
        Account account = accountdao.find(user.getUserID());
        Client client = clientdao.find(account.getClientID().getClientID());
        Addresstype addresstype = addresstypedao.find(entity.getAddresstypeID().getAddresstypeID());
        entity.setAddresstypeID(addresstype);
        entity.setClientID(client);
        addressdao.create(entity);
        client.getAddressCollection().add(entity);
        clientdao.edit(client);
    }

    @POST
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Address entity, @PathParam("id") Integer id) {
        Client client = clientdao.find(id);
        Addresstype addresstype = addresstypedao.find(entity.getAddresstypeID().getAddresstypeID());
        entity.setAddresstypeID(addresstype);
        entity.setClientID(client);
        addressdao.create(entity);
    }

    @PUT
    @Secured
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(Address entity) {
        Account account = accountdao.find(user.getUserID());
        Client client = clientdao.find(account.getClientID().getClientID());
        Address address = addressdao.find(entity.getAddressID());
        address.setCity(entity.getCity());
        address.setHousenumber(entity.getHousenumber());
        address.setHousenumberAddition(entity.getHousenumberAddition());
        address.setPostalcode(entity.getPostalcode());
        address.setStreetname(entity.getStreetname());
        Addresstype addresstype = addresstypedao.find(entity.getAddresstypeID().getAddresstypeID());
        address.setAddresstypeID(addresstype);
        addressdao.edit(address);
        client.getAddressCollection().remove(address);
        client.getAddressCollection().add(entity);
        clientdao.edit(client);
    }

    @DELETE
    @Secured
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") Integer id) {
        Account account = accountdao.find(user.getUserID());
        Client client = clientdao.find(account.getClientID().getClientID());
        client.getAddressCollection().remove(addressdao.find(id));
        clientdao.edit(client);
        addressdao.remove(addressdao.find(id));
    }

}
