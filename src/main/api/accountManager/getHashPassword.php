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

// SQL query to retrieve password associated with user_id.
$sql = "SELECT password FROM account WHERE user_id = '$user_id'";
$result = $connection->query($sql);

if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user_hash_password = $row["password"];
} else {
    echo "-1";
    exit();
}

echo $user_hash_password;

$connection->close();

?>