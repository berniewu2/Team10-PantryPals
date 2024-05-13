<?php

$hostname = 'localhost';
$database = 'teamcis2_PantryPal';
$username;
$password;

//Check if both user_id and password are provided. 
if(!(isset($_GET["user_id"]) && isset($_GET["password"]))) {
    echo "Both user_id and password must be provided";
    exit();
}

//Grab user and password from url.
$user_id = $_GET["user_id"];
$user_password = $_GET['password'];
$user_hash_password = password_hash($user_password, PASSWORD_DEFAULT);

//Establish database connection.
$connection = new mysqli($hostname, $username, $password, $database);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// SQL query to create the 'account' table
$sql = "CREATE TABLE IF NOT EXISTS account(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
)";

if ($connection->query($sql) === FALSE) {
    echo "Error creating table: " . $connection->error;
} 

//Check if user name is already taken.
$sql = "SELECT user_id FROM account WHERE user_id = '$user_id'";
$result = $connection->query($sql);

if($result->num_rows > 0) {
    echo "User ID already exists";
    exit();
}

//Insert user_id and password into the database.
$sql = "INSERT INTO account (user_id, password) VALUES ('$user_id', '$user_hash_password')";

if ($connection->query($sql) === TRUE) {
    echo "Account created successfully";
} else {
    echo "Error inserting data: " . $connection->error . "\n";
}

$connection->close();
?>