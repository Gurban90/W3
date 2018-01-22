/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Gerben
 */
@Entity
@Table(name = "address")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Address.findAll", query = "SELECT a FROM Address a")
    , @NamedQuery(name = "Address.findByAddressID", query = "SELECT a FROM Address a WHERE a.addressID = :addressID")
    , @NamedQuery(name = "Address.findByStreetname", query = "SELECT a FROM Address a WHERE a.streetname = :streetname")
    , @NamedQuery(name = "Address.findByHousenumber", query = "SELECT a FROM Address a WHERE a.housenumber = :housenumber")
    , @NamedQuery(name = "Address.findByHousenumberAddition", query = "SELECT a FROM Address a WHERE a.housenumberAddition = :housenumberAddition")
    , @NamedQuery(name = "Address.findByPostalcode", query = "SELECT a FROM Address a WHERE a.postalcode = :postalcode")
    , @NamedQuery(name = "Address.findByCity", query = "SELECT a FROM Address a WHERE a.city = :city")})
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "addressID")
public class Address implements Serializable {
 
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AddressID")
    private Integer addressID;
    @Size(max = 45)
    @Column(name = "Streetname")
    private String streetname;
    @Column(name = "Housenumber")
    private Integer housenumber;
    @Size(max = 45)
    @Column(name = "HousenumberAddition")
    private String housenumberAddition;
    @Size(max = 45)
    @Column(name = "Postalcode")
    private String postalcode;
    @Size(max = 45)
    @Column(name = "City")
    private String city;
    @JoinColumn(name = "AddresstypeID", referencedColumnName = "AddresstypeID")
    @ManyToOne(optional = false)
    @JsonIgnoreProperties("addressCollection")
    private Addresstype addresstypeID;
    @JoinColumn(name = "ClientID", referencedColumnName = "ClientID")
    @ManyToOne(optional = false)
    @JsonIgnoreProperties("addressCollection")
    private Client clientID;

    public Address() {
    }

    public Address(Integer addressID) {
        this.addressID = addressID;
    }

    public Integer getAddressID() {
        return addressID;
    }

    public void setAddressID(Integer addressID) {
        this.addressID = addressID;
    }

    public String getStreetname() {
        return streetname;
    }

    public void setStreetname(String streetname) {
        this.streetname = streetname;
    }

    public Integer getHousenumber() {
        return housenumber;
    }

    public void setHousenumber(Integer housenumber) {
        this.housenumber = housenumber;
    }

    public String getHousenumberAddition() {
        return housenumberAddition;
    }

    public void setHousenumberAddition(String housenumberAddition) {
        this.housenumberAddition = housenumberAddition;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Addresstype getAddresstypeID() {
        return addresstypeID;
    }

    public void setAddresstypeID(Addresstype addresstypeID) {
        this.addresstypeID = addresstypeID;
    }

    public Client getClientID() {
        return clientID;
    }

    public void setClientID(Client clientID) {
        this.clientID = clientID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (addressID != null ? addressID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Address)) {
            return false;
        }
        Address other = (Address) object;
        if ((this.addressID == null && other.addressID != null) || (this.addressID != null && !this.addressID.equals(other.addressID))) {
            return false;
        }
        return true;
    }

}
