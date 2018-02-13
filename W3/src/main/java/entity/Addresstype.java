/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Gerben
 */
@Entity
@Table(name = "addresstype")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Addresstype.findAll", query = "SELECT a FROM Addresstype a")
    , @NamedQuery(name = "Addresstype.findByAddresstypeID", query = "SELECT a FROM Addresstype a WHERE a.addresstypeID = :addresstypeID")
    , @NamedQuery(name = "Addresstype.findByTypename", query = "SELECT a FROM Addresstype a WHERE a.typename = :typename")})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "orderdetailID")
public class Addresstype implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AddresstypeID")
    private Integer addresstypeID;
    @Size(max = 45)
    @Column(name = "Typename")
    private String typename;
    @OneToMany(mappedBy = "addresstypeID")
    @JsonIgnoreProperties("addresstypeID")
    private List<Address> addressCollection;

    public Addresstype() {
    }

    public Addresstype(Integer addresstypeID) {
        this.addresstypeID = addresstypeID;
    }

    public Integer getAddresstypeID() {
        return addresstypeID;
    }

    public void setAddresstypeID(Integer addresstypeID) {
        this.addresstypeID = addresstypeID;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }

    @XmlTransient
     public List<Address> getAddressCollection() {
        return addressCollection;
    }

    public void setAddressCollection(List<Address> addressCollection) {
        this.addressCollection = addressCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (addresstypeID != null ? addresstypeID.hashCode() : 0);
        return hash;
    }

   

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Addresstype)) {
            return false;
        }
        Addresstype other = (Addresstype) object;
        if ((this.addresstypeID == null && other.addresstypeID != null) || (this.addresstypeID != null && !this.addresstypeID.equals(other.addresstypeID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Addresstype[ addresstypeID=" + addresstypeID + " ]";
    }

}
