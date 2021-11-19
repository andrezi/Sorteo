<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Página con PHP</title> 
</head>
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="js/bootstrap.min.js"> </script>

<body>
	
	<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
<input type="submit" class="btn btn-success" name="submit" value="GANADORES"><br>


<?php
include 'conexion.php';

 $num2= 2;

$consulta1 = "SELECT * FROM premios where id = $num2 ";
$resultado1 = mysqli_query( $conn, $consulta1 );
$resultado1 = mysqli_query( $conn, $consulta1 ) or die ( "Algo ha ido mal en la consulta a la base de datos");
echo "<table borde='2'>";
echo "<tr>";
echo "<th>id</th>";
echo "<th>premio</th>";
echo "<th>nombre</th>";
echo "<th>apellido</th>";
echo "</tr>";

while ($columna1 = mysqli_fetch_array( $resultado1 ))
{

	
	echo "<tr>";
	echo "<td>" . $columna1['id'] . "</td><td>" . $columna1['premio'] . "</td>";
	echo "</tr>";

	$premio = $columna1['premio'] ;

}
echo "</table>";
 

 




if(isset($_POST['submit']))
 
{
 
//$num = rand(0000, 9999);
	//$num = 3344;
///echo $num;

$consulta = "SELECT * FROM numero  where estado = 'activo' order by rand() Limit 1 ";
$resultado = mysqli_query( $conn, $consulta );
$resultado = mysqli_query( $conn, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");
echo "<table borde='2'>";
echo "<tr>";
echo "<th>numero</th>";
echo "<th>cedula</th>";
echo "<th>nombre</th>";
echo "<th>apellido</th>";
echo "</tr>";

while ($columna = mysqli_fetch_array( $resultado ))
{

	
	echo "<tr>";
	echo "<td>" . $columna['numero'] . "</td><td>" . $columna['cedula'] . "</td><td>" . $columna['nombre'] . "</td><td>" . $columna['apellido'] . "</td>";
	echo "</tr>";

	$cedula =  $columna['cedula'] ;
	$nombre =  $columna['nombre'] ;
	$apellido = $columna['apellido'] ;
	$numero = $columna['numero'] ;
	
}
echo "</table>";



$sql = "INSERT INTO ganadores (cedula, nombre, apellido, numero, premio) ";
    $sql.= "VALUES ('".$cedula."', '".$nombre."', '".$apellido."', '".$numero."', '".$premio."')";
    // enviamos la consulta
   $resultado = mysqli_query( $conn, $sql );

    $sql = "UPDATE numero SET cedula = '$cedula', nombre = '$nombre', apellido = '$apellido', estado = 'inactivo' where cedula = '$cedula'";

   $resultado = mysqli_query( $conn, $sql );


 
}
 




?>


</body>
</html>