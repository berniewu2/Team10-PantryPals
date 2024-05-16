<?php

$hostname = 'localhost';
$database = 'teamcis2_PantryPal';
$username;
$password;

//Check user_id is provided.
if(!isset($_GET["unique_id"])) {
    echo "A unique id must be provided\n";
    exit();
}

//Grab user and password from url.
$unique_id = $_GET["unique_id"];

//Establish database connection.
$connection = new mysqli($hostname, $username, $password, $database);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// SQL query to create the 'account' table
$sql = "DELETE FROM account WHERE id ='$unique_id'";

if ($connection->query($sql) === TRUE) {
    echo "1";
} else {
    echo "Error deleting record: " . $connection->error . "\n";
}

$connection->close();

?>