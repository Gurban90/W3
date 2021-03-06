/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import entity.Orderdetail;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Gerben
 */
@Stateless
public class OrderdetailFacade extends AbstractFacade<Orderdetail> {

    @PersistenceContext(unitName = "com.mycompany_W3_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public OrderdetailFacade() {
        super(Orderdetail.class);
    }
    
}
