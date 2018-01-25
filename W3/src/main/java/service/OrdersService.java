/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import dao.OrdersFacade;
import java.util.Calendar;
import java.util.Date;
import javax.ejb.EJB;

/**
 *
 * @author Gerben
 */
public class OrdersService {
    
    public Date setDate() {
        Date date = new Date();
        return date;
    }

    public Date setFutureDate() {
        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.add(Calendar.DATE, 7);
        Date later = cal.getTime();
        return later;
    }

    public void deleteCheeseOrder(int detailid, int q) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
