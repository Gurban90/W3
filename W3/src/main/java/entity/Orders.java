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
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Gerben
 */
@Entity
@Table(name = "orders")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Orders.findAll", query = "SELECT o FROM Orders o")
    , @NamedQuery(name = "Orders.findByOrdersID", query = "SELECT o FROM Orders o WHERE o.ordersID = :ordersID")
    , @NamedQuery(name = "Orders.findByCurrentdate", query = "SELECT o FROM Orders o WHERE o.currentdate = :currentdate")
    , @NamedQuery(name = "Orders.findByTotalprice", query = "SELECT o FROM Orders o WHERE o.totalprice = :totalprice")
    , @NamedQuery(name = "Orders.findByEnddate", query = "SELECT o FROM Orders o WHERE o.enddate = :enddate")})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "ordersID")
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "OrdersID")
    private Integer ordersID;
    @Column(name = "Currentdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date currentdate;
    @Size(max = 45)
    @Column(name = "Totalprice")
    private String totalprice;
    @Column(name = "Enddate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date enddate;
    @JoinColumn(name = "ClientID", referencedColumnName = "ClientID")
    @ManyToOne(optional = false)
    @JsonIgnoreProperties("ordersCollection")
    private Client clientID;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ordersID")
    @JsonIgnoreProperties("ordersID")
    private Collection<Orderdetail> orderdetailCollection;

    public Orders() {
    }

    public Orders(Integer ordersID) {
        this.ordersID = ordersID;
    }

    public Integer getOrdersID() {
        return ordersID;
    }

    public void setOrdersID(Integer ordersID) {
        this.ordersID = ordersID;
    }

    public Date getCurrentdate() {
        return currentdate;
    }

    public void setCurrentdate(Date currentdate) {
        this.currentdate = currentdate;
    }

    public String getTotalprice() {
        return totalprice;
    }

    public void setTotalprice(String totalprice) {
        this.totalprice = totalprice;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public Client getClientID() {
        return clientID;
    }

    public void setClientID(Client clientID) {
        this.clientID = clientID;
    }

    @XmlTransient
    public Collection<Orderdetail> getOrderdetailCollection() {
        return orderdetailCollection;
    }

    public void setOrderdetailCollection(Collection<Orderdetail> orderdetailCollection) {
        this.orderdetailCollection = orderdetailCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ordersID != null ? ordersID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Orders)) {
            return false;
        }
        Orders other = (Orders) object;
        if ((this.ordersID == null && other.ordersID != null) || (this.ordersID != null && !this.ordersID.equals(other.ordersID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Orders[ ordersID=" + ordersID + " ]";
    }

}
