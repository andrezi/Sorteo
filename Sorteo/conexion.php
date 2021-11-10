<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Página con PHP</title> 
</head>
<body>
<?php
$servername = "localhost";
$database = "sorteogane";
$username = "root";
$password = "";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection    
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    
}
//echo "Connected successfully";
$db = mysqli_select_db( $conn, $database );
//mysqli_close($conn);
?>
</body>
</html>
