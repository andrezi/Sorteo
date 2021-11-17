<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="content-script-type" content="text/javascript" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/text.css" rel="stylesheet" />
    <link href="css/stylos.css" rel="stylesheet"/>
    <script type="text/javascript" src='./js/jquery.min.js'></script>
    <script type="text/javascript" src='./js/bootstrap.min.js'></script>
    <script type="text/javascript" src="./js/index.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <meta charset="UTF-8">
    <title>Ganadores!!</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link href="../Sorteo/css/css.css" rel="stylesheet">
    <link rel='stylesheet prefetch' href='../Sorteo/css/bootstrap.min.css'>
  
    <link rel="stylesheet prefetch" href="../Sorteo/css/font-awesome.css" />
    <link rel="stylesheet" href="../Sorteo/css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet">
    <link href="css/text.css" rel="stylesheet" />




    <title>Document</title>
</head>
<style type="text/css">
      html, body {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
      }
</style>
<body>

<div class="row">


<form action="index.php">
    <input type=image src=img/regalo.png class="button-3di font-1 uppercase">
      </form>
      </div>
<img src="img/fonganadores.jpg" id="full-screen-background-image" /> 
  <div id="wrapper">
    
  <?php
    
    include 'conexion.php';
       
        $consulta =     "SELECT a.nombres, a.apellidos , p.nombre_premio FROM ganadores g 
        inner join asesores a on g.id_cedula = a.cedula
        inner join premios p on g.id_premio = p.id";
    
        $resultado = mysqli_query( $conn, $consulta );
        $consultaBD =  $resultado;
        
    ?>


<center>
    <div id="divPadre">
        <div id="divHijo">
            <h1 class="text3DG">¡GANADORES!</h1>
            
        </div>
    </div>
    <div class="div-footer2">
<table class="table" >
<center><thead class="thead-dark">
      <tr>      
      <th style="text-align:center; font-size:25px;">NOMBRE</th>
      <th style="text-align:center; font-size:25px;">PREMIO</th>
      </tr>
      
    </thead></center>
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
</table></div>
</center>
</div>

  </div>

</body>
</html>