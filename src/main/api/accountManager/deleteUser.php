<?php

$hostname = 'localhost';
$database = 'teamcis2_PantryPal';
$username;
$password;

//Check user_id is provided.
if(!isset($_GET["user_id"])) {
    echo "A user_id must be provided\n";
    exit();
}

//Grab user and password from url.
$user_id = $_GET["user_id"];

//Establish database connection.
$connection = new mysqli($hostname, $username, $password, $database);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// SQL query to create the 'account' table
$sql = "DELETE FROM account WHERE user_id ='$user_id'";

if ($connection->query($sql) === TRUE) {
    echo "User with user_id '$user_id' deleted successfully\n";
} else {
    echo "Error deleting record: " . $connection->error . "\n";
}

$connection->close();
?>