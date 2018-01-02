/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Gerben
 */
@Entity
@Table(name = "orderdetail")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Orderdetail.findAll", query = "SELECT o FROM Orderdetail o")
    , @NamedQuery(name = "Orderdetail.findByOrderdetailID", query = "SELECT o FROM Orderdetail o WHERE o.orderdetailID = :orderdetailID")
    , @NamedQuery(name = "Orderdetail.findByQuantity", query = "SELECT o FROM Orderdetail o WHERE o.quantity = :quantity")})
public class Orderdetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "OrderdetailID")
    private Integer orderdetailID;
    @Column(name = "Quantity")
    private Integer quantity;
    @JoinColumn(name = "CheeseID", referencedColumnName = "CheeseID")
    @ManyToOne(optional = false)
    private Cheese cheeseID;
    @JoinColumn(name = "OrdersID", referencedColumnName = "OrdersID")
    @ManyToOne(optional = false)
    private Orders ordersID;

    public Orderdetail() {
    }

    public Orderdetail(Integer orderdetailID) {
        this.orderdetailID = orderdetailID;
    }

    public Integer getOrderdetailID() {
        return orderdetailID;
    }

    public void setOrderdetailID(Integer orderdetailID) {
        this.orderdetailID = orderdetailID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Cheese getCheeseID() {
        return cheeseID;
    }

    public void setCheeseID(Cheese cheeseID) {
        this.cheeseID = cheeseID;
    }

    public Orders getOrdersID() {
        return ordersID;
    }

    public void setOrdersID(Orders ordersID) {
        this.ordersID = ordersID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (orderdetailID != null ? orderdetailID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Orderdetail)) {
            return false;
        }
        Orderdetail other = (Orderdetail) object;
        if ((this.orderdetailID == null && other.orderdetailID != null) || (this.orderdetailID != null && !this.orderdetailID.equals(other.orderdetailID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Orderdetail[ orderdetailID=" + orderdetailID + " ]";
    }
    
}
