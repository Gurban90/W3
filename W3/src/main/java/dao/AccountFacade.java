/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import entity.Account;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Gerben
 */
@Stateless
public class AccountFacade extends AbstractFacade<Account> {

    @PersistenceContext(unitName = "com.mycompany_W3_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public AccountFacade() {
        super(Account.class);
    }
           
    public Object findByUsername(String username) {
     return getEntityManager().createQuery("SELECT a FROM Account a WHERE a.username = :accUsername")
             .setParameter("accUsername", username)
             .getSingleResult();
    
            }

}
