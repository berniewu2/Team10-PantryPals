package Model;

import java.util.HashMap;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URI;
import at.favre.lib.crypto.bcrypt.BCrypt;

public class AccountManager {
    private HashMap<Integer, UserAccount> userAccounts;
    private int highestUserID;
    private String csvFilePath;

    public AccountManager(String csvFilePath) {
        this.csvFilePath = csvFilePath;
        userAccounts = new HashMap<>();
        highestUserID = 0;
        loadFromCSV();
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

    // Some ideas from https://stackoverflow.com/questions/14226830/java-csv-file-easy-read-write
    // and https://attacomsian.com/blog/java-read-parse-csv-file
    // https://www.w3schools.com/java/java_files_create.asp
    synchronized void loadFromCSV() {
        String line = "";
        String csvSplitBy = ",";
        boolean dataIsValid = true;
    
        // Make sure file exists
        File csvFile = new File(csvFilePath);
        if (!csvFile.exists()) {
            try {
                csvFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    
        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            System.out.println("Reading Saved Users");
            while ((line = br.readLine()) != null) {
                //System.out.println("Read:\"" + line + "\"");
                // use comma as separator
                String[] user = line.split(csvSplitBy);

                // Skip empty lines
                if (line.isEmpty()) {
                    continue;
                }
            
                // Check it is formatted correctly and first entry is an Int
                if (user.length != 3 || !isInteger(user[0])) {
                    dataIsValid = false;
                    break;
                }
                try {
                    int userID = Integer.parseInt(user[0]);
                    String username = user[1];
                    String password = user[2];
                    userAccounts.put(userID, new UserAccount(userID, username, password));
                    if (userID > highestUserID) {
                        highestUserID = userID;
                    }
                } catch (NumberFormatException e) {
                    dataIsValid = false;
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    
        if (!dataIsValid) {
            userAccounts.clear();
            highestUserID = 0;
            saveToCSV();
        }
    }

    synchronized void saveToCSV() {
        try {
            FileWriter csvWriter = new FileWriter(csvFilePath);
    
            for (UserAccount user : userAccounts.values()) {
                csvWriter.append(String.valueOf(user.getUserID()));
                csvWriter.append(",");
                csvWriter.append(user.getUsername());
                csvWriter.append(",");
                csvWriter.append(user.getPassword());
                csvWriter.append("\n");
            }
    
            csvWriter.flush();
            csvWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
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

