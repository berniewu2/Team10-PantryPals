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

//Establish database connection.
$connection = new mysqli($hostname, $username, $password, $database);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// SQL query to create the 'current_user' table.
$sql = "CREATE TABLE IF NOT EXISTS `current_user`(
    id INT(6) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
)";

if ($connection->query($sql) === FALSE) {
    echo "Error creating table: " . $connection->error;
} 

//Deleting previous current user.
$sql = "DELETE FROM `current_user` WHERE id = 1";
$connection->query($sql);

//Insert user_id and password into the database.
$sql = "INSERT INTO `current_user` (id, user_id, password) VALUES (1, '$user_id', '$user_password')";

if ($connection->query($sql) === TRUE) {
    echo "Set current user successfully";
} else {
    echo "Error inserting data: " . $connection->error . "\n";
}

$connection->close();
?>