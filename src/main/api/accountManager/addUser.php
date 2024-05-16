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
    echo "-1";
    exit();
}

//Insert user_id and password into the database.
$sql = "INSERT INTO account (user_id, password) VALUES ('$user_id', '$user_password')";

if ($connection->query($sql) === TRUE) {
    $sql = "SELECT id FROM account WHERE user_id = '$user_id'";
    $result = $connection->query($sql);
    $row = $result->fetch_assoc();
    $unique_id = $row["id"];
    echo $unique_id;
} else {
    echo "Error inserting data: " . $connection->error . "\n";
}

$connection->close();

?>