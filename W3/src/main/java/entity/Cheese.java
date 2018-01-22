/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Gerben
 */
@Entity
@Table(name = "cheese")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cheese.findAll", query = "SELECT c FROM Cheese c")
    , @NamedQuery(name = "Cheese.findByCheeseID", query = "SELECT c FROM Cheese c WHERE c.cheeseID = :cheeseID")
    , @NamedQuery(name = "Cheese.findByName", query = "SELECT c FROM Cheese c WHERE c.name = :name")
    , @NamedQuery(name = "Cheese.findByPrice", query = "SELECT c FROM Cheese c WHERE c.price = :price")
    , @NamedQuery(name = "Cheese.findByStock", query = "SELECT c FROM Cheese c WHERE c.stock = :stock")})
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "cheeseID")
public class Cheese implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "CheeseID")
    private Integer cheeseID;
    @Size(max = 45)
    @Column(name = "Name")
    private String name;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Price")
    private BigDecimal price;
    @Size(max = 45)
    @Column(name = "Stock")
    private String stock;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cheeseID")
        private Collection<Orderdetail> orderdetailCollection;

    public Cheese() {
    }

    public Cheese(Integer cheeseID) {
        this.cheeseID = cheeseID;
    }

    public Integer getCheeseID() {
        return cheeseID;
    }

    public void setCheeseID(Integer cheeseID) {
        this.cheeseID = cheeseID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
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
        hash += (cheeseID != null ? cheeseID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Cheese)) {
            return false;
        }
        Cheese other = (Cheese) object;
        if ((this.cheeseID == null && other.cheeseID != null) || (this.cheeseID != null && !this.cheeseID.equals(other.cheeseID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Cheese[ cheeseID=" + cheeseID + " ]";
    }

}
