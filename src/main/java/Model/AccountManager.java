package Model;

import java.util.HashMap;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URI;
import at.favre.lib.crypto.bcrypt.BCrypt;

public class AccountManager {
    private HashMap<Integer, UserAccount> userAccounts;

    public AccountManager() {
        userAccounts = new HashMap<>();
    }

    public synchronized int addUser(String username, String password) {
        try {
            //api end point for googie host data base to add user.
            URI uri = new URI("http://team10.c1.is/api/accountManager/addUser.php?user_id=" + username + "&password=" + hashPassword(password));
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            //Reading the response from the get request.
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line = reader.readLine();

            response.append(line);
            reader.close();

            //Creating the user account instance in the program.
            int userID = Integer.parseInt(response.toString());
            UserAccount user = new UserAccount(userID, username, password);
            userAccounts.put(userID, user);

            System.out.println("Added userID: " + userID);

            return userID;

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return -1;
    }

    public synchronized boolean deleteUser(int userID) {
        try {
            //api end point for googie host delete user.
            URI uri = new URI("http://team10.c1.is/api/accountManager/deleteUser.php?unique_id=" + userID );
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            //Reading the response from the get request.
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line = reader.readLine();

            response.append(line);
            reader.close();

            //If response is 1, then deletion is successful.
            if(response.toString().equals("1")) {
                return true;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public UserAccount getUser(int userID) {
        return userAccounts.get(userID);
    }

    public synchronized Integer getUserID(String username, String password) {
        try {

            //Verify the account first. 
            boolean verified = verifyAccount(username, password);

            if(!verified){
                return null;
            }

            //api end point for googie host delete user.
            URI uri = new URI( "http://team10.c1.is/api/accountManager/getUniqueID.php?user_id=" + username );
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            //Reading the response from the get request.
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line = reader.readLine();

            response.append(line);
            reader.close();

            //Convert the response to integer. 
            int unique_id = Integer.parseInt(response.toString());

            if(unique_id >= 0){
                return unique_id;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public synchronized boolean verifyAccount(String username, String password) {
        try {
            //api end point for googie host delete user.
            URI uri = new URI( "http://team10.c1.is/api/accountManager/getHashPassword.php?user_id=" + username );
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            //Reading the response from the get request.
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line = reader.readLine();

            response.append(line);
            reader.close();

            String hashedPassword = response.toString();
            return verifyPassword(password, hashedPassword);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    private String hashPassword(String password) {
        String bcryptHashString = BCrypt.withDefaults().hashToString(12, password.toCharArray());
        return bcryptHashString;
    }

    private boolean verifyPassword(String password, String hashedPassword) {
        BCrypt.Result result = BCrypt.verifyer().verify(password.toCharArray(), hashedPassword);
        return result.verified;
    }
}

class UserAccount {
    private int userID;
    private String username;
    private String password;

    public UserAccount(int userID, String username, String password) {
        this.userID = userID;
        this.username = username;
        this.password = password;
    }

    public int getUserID() {
        return this.userID;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }
}

