<?php 
include 'conexion.php';
//$resultado = $_POST['cedula']; 
//echo $resultado;

        echo "<spam style='font-family: Britannic Bold; font-size: 50px;'>". $_POST['nombre'] ." ". $_POST['apellido'] ."</spam>";
      
            

            $cedula =  $_POST['cedula'];
            $nombre =  $_POST['nombre'] ;
            $apellido = $_POST['apellido'] ;
            $premio = $_POST['premio'] ;
            //$numero = $_POST['numero'] ;
        
            


            //if (mysqli_num_rows($resultado1)!=0) {
              $sql = "INSERT INTO `ganadores`( `id_cedula`, `id_premio`, `fecha`)";
              $sql.= "VALUES ('".$cedula."', '".$premio."', NOW())";
                // enviamos la consulta
              $resultado = mysqli_query( $conn, $sql );

              $sql = "UPDATE `premios` SET `estado`= 'inactivo' where id = ".$premio;
              $resultado = mysqli_query( $conn, $sql );

              $sql = "UPDATE `asesores` SET `estado`= 'inactivo' where cedula = ".$cedula;
              $resultado = mysqli_query( $conn, $sql );
            //}
    


?>