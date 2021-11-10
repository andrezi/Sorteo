<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/text.css" rel="stylesheet" />
    <script type="text/javascript" src='./js/jquery.min.js'></script>
    <script type="text/javascript" src='./js/bootstrap.min.js'></script>
    <script type="text/javascript" src="./js/index.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>



    <title>Document</title>
</head>
<body>
<?php
    
    include 'conexion.php';
       
        $consulta =     "SELECT a.nombres, a.apellidos , p.nombre_premio FROM ganadores g 
        inner join asesores a on g.id_cedula = a.cedula
        inner join premios p on g.id_premio = p.id";
    
        $resultado = mysqli_query( $conn, $consulta );
        $consultaBD =  $resultado;
        
    ?>


<table id="table_fixed">
    <thead>
      <tr>      
        <th>NOMBRE</th>
        <th>PREMIO</th>
      </tr>
    </thead>
</table>
<div id="contain">  
  <table id="table_scroll">
    <tbody>
        <?php
        while ($valores = mysqli_fetch_array($consultaBD)){
                echo "<tr>";
                echo "<td>".$valores['nombres']." ".$valores['apellidos']."</td>";
                echo  "<td>".$valores['nombre_premio']."</td>" ;
                echo "</tr>";
            }
        ?>
        
    </tbody>
</table>
</div>
</body>
</html>