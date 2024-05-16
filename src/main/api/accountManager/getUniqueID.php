<?php

$hostname = 'localhost';
$database = 'teamcis2_PantryPal';
$username;
$password;

//Check if both user_id and password are provided. 
if( !isset($_GET["user_id"]) ) {
    echo "User name must be provided";
    exit();
}

//Grab user and password from url.
$user_id = $_GET['user_id'];

//Establish database connection.
$connection = new mysqli($hostname, $username, $password, $database);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT id FROM account WHERE user_id = '$user_id'";
$result = $connection->query($sql);

if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $unique_id = $row["id"];
} else {
    echo "-1";
    exit();
}

echo $unique_id;

$connection->close();
?>