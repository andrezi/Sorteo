<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Página con PHP</title> 
</head>
<body>
<?php
$servername2 = "localhost";
$database2 = "sorteogane2";
$username2 = "root";
$password2 = "";
// Create connection
$conn2 = mysqli_connect($servername2, $username2, $password2, $database2);
// Check connection    
if (!$conn2) {
    die("Connection failed: " . mysqli_connect_error());
    
}
//echo "Connected successfully";
$db2 = mysqli_select_db( $conn2, $database2 );
//mysqli_close($conn);
?>
</body>
</html>
