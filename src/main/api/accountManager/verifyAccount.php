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

// SQL query to retrieve password asspciated with user_id.
$sql = "SELECT password FROM account WHERE user_id = '$user_id'";
$result = $connection->query($sql);

if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user_hash_password = $row["password"];
} else {
    echo "User does not exist";
}

if(password_verify($user_password, $user_hash_password)) {
    echo "User verified";
} else {
    echo "Invalid password";
}

$connection->close();
?>