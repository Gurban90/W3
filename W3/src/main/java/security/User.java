/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package security;

/**
 *
 * @author Gerben
 */
public class User {

    private static int userID;
    private static String userName;
    private static String userRole;

    public void AuthenticatedUserDetails(int userID, String username, String userRole) {
        this.userID = userID;
        this.userName = username;
        this.userRole = userRole;
    }

    public int getUserID() {
        return userID;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserRole() {
        return userRole;
    }

}
