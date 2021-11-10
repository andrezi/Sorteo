<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Rifa!!</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link href="../Sorteo/css/css.css" rel="stylesheet">
    <link rel='stylesheet prefetch' href='../Sorteo/css/bootstrap.min.css'>
  
    <link rel="stylesheet prefetch" href="../Sorteo/css/font-awesome.css" />
    <link rel="stylesheet" href="../Sorteo/css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet">
    <link href="css/text.css" rel="stylesheet" />

</head>
<body>
<?php
    
include 'conexion.php';
?>




<?php    
    $consulta =     "SELECT nombres,apellidos,estado,numero,cedula FROM `numeros` 
                    INNER JOIN asesores 
                    on id_cedula = cedula
                    where estado = 'activo' order by rand() Limit 1";

    $resultado = mysqli_query( $conn, $consulta );
    $resultado = mysqli_query( $conn, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");
    $consultaBD = mysqli_fetch_array( $resultado);
    
?>

<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <?php 
        //while ($columna = mysqli_fetch_array( $resultado )){
        echo "<input type='hidden' id='cedula' value='".$consultaBD['cedula']."'>";
        echo "<input type='hidden' id='numero' value='".$consultaBD['numero']."'>";
        echo "<input type='hidden' id='nombre' value='".$consultaBD['nombres']."'>";
        echo "<input type='hidden' id='apellido' value='".$consultaBD['apellidos']."'>";
        //}
    ?>

<canvas id="c" style="display:none;z-index:-100;"></canvas>

    <div class="container">
        
        <div>
            <div class="row">
                <div id="ganador">
                    <span id="resultado" class="text3D"></span>
                </div>  
                <div class ="divPadre" id="premios">
                    <div class="divHijo">
                <span style='font-family: Lobster; font-size: 40px;'>Seleccione Premio:</span>
                <select id="producto" name="producto" class="form-control" required>
                <option value="">Seleccione:</option> 
>                <?php
                // Realizamos la consulta para extraer los datos
                 $consulta1 = "SELECT * FROM premios where estado='activo'";
                $resultado1 = mysqli_query( $conn, $consulta1 );
                    
                while ($valores = mysqli_fetch_array($resultado1)) {
                // En esta sección estamos llenando el select con datos extraidos de una base de datos.
                echo '<option value="'.$valores[id].'">'.$valores[nombre_premio].'</option>';
                }
                echo "</select>";

                    $num2= 2;

                

                while ($columna1 = mysqli_fetch_array( $resultado1 ))
                {
                    echo "<tr>";
                    echo "<td>" . $columna1['id'] . "</td><td>" . $columna1['nombre_premio'] . "</td>";
                    echo "</tr>";
                    $premio = $columna1['nombre_premio'] ;
                }
                echo "</table>";
            ?>  
                </div>
                </div>
                <div id="borrar" class="col-md-5"></div>
                <div id="ganadores" class="col-md-3">
                </div>  
                
            </div>
            <br><br>

			<div class="col-md-12">
            <div class="quote-block">
                <div class="content" style="background:black !important;">
                    <h1 id="bot" class="ban text-center">
                        <!--<span id="XXXX" style="float: left; margin-left: 7%; width: 250px !important;" class="copaGrande"></span>-->
						<span id="nUMil" style="color:rgba(239,0,0);; border-top:8px solid #F9DE19; border-right:6px solid #F9DE19;border-left:6px solid #F9DE19; border-bottom:8px solid #F9DE19;  margin-left: 1%;float: left; width: 200px !important; no-repeat center center; ">0</span>
                        <span id="nCentenas" style="color:rgba(239,0,0); border-top:8px solid #F9DE19; border-right:6px solid #F9DE19; border-bottom:8px solid #F9DE19;border-left:6px solid #F9DE19; float: left; width: 200px !important; no-repeat center center;">0</span>
                        <span id="nDecenas" style="color:rgba(239,0,0); border-top:8px solid #F9DE19; border-right:6px solid #F9DE19; border-bottom:8px solid #F9DE19;border-left:6px solid #F9DE19;float: left; width: 200px !important;no-repeat center center;">0</span>
                        <span id="nUnidades" style="color:rgba(239,0,0); border-top:8px solid #F9DE19; border-right:6px solid #F9DE19; border-bottom:8px solid #F9DE19;border-left:6px solid #F9DE19;float: left; width: 200px !important; no-repeat center center;">0</span>
                        <span id="nDMil" style="color:rgba(239,0,0); border-top:8px solid #F9DE19; border-right:6px solid #F9DE19; border-bottom:8px solid #F9DE19;border-left:6px solid #F9DE19;float: left; width: 200px !important; no-repeat center center;">0</span>
                    </h1>
                </div>

     <!--            <div class="button">
                <a class="button-3d font-1 uppercase">
                click <span style="color: var(--color-w)">here</span>
                </a>
                </div>
 -->
                <div class="button row text-center">
                    <div class="col-xs-12">
                   <br><br>
                        <!--<input type="submit" name="submit" id="getQuote" class="btn btn-lg ban" onclick="GenerarSiguienteGanador();" value="GANADORES">-->
                         <input type=image src=img/imagen5.png name="getQuote" onclick="hola(); realizaProceso($('#cedula').val(),$('#nombre').val(),$('#apellido').val()); GenerarSiguienteGanador($('#numero').val(),$('#producto').val());"  class="button-3d font-1 uppercase" id="getQuote" value="Gane">
                        
                        <button style="display: none" id="nuevoG" class="button-3dd font-1 uppercase" onclick="reload();">
                            Nuevo ganador
                        </button>
                        </script>
                    </div>
                </div>
            </div>
			</div>
		</div>
    </div>


<!--<input type="submit" class="btn btn-lg ban" name="submit" id="submit" value="GANADORES"><br>-->



    </form>


    
 



    <script type="text/javascript" src='../Sorteo/js/jquery.min.js'></script>
    <script type="text/javascript" src='../Sorteo/js/bootstrap.min.js'></script>
    <script type="text/javascript" src="../Sorteo/js/index.js"></script>
	<script type="text/javascript" src="../lib/sotoreMaster/dist/basil.min.js"></script>
	<script type="text/javascript">
    /*$( "#getQuote" ).click(function() {
        alert( "HOLA" );
    });*/
    function hola(){
        if(document.getElementById("producto").value != ""){
            $('input').attr('type', 'hidden');
            $("#premios").css("display","none");
            $("#borrar").css("display","none");
            $("#nuevoG").css("display","");
            $("#ganador").attr("class","col-md-9");

        }
    }

    function realizaProceso(cedula, nombre, apellido){

         if(document.getElementById("producto").value != ""){
                var parametros = {
                "cedula": cedula ,
                "nombre": nombre ,
                "apellido": apellido ,
                "premio": document.getElementById("producto").value
            };
            $.ajax({
                    data:  parametros,
                    url:   'ejemplo_ajax_proceso.php',

                    type:  'post',
                    beforeSend: function () {
                            $("#resultado").html("");
                    },

                    success:  function (response) {
                    
                     setTimeout(function() {

                       $("#resultado").html(response);

                       }, 5300);         
                           

                  
                        
                    }
            });
        }
    }



	function loadScript(url, callback)
	{
		// Adding the script tag to the head as suggested before
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		// Then bind the event to the callback function.
		// There are several events for cross browser compatibility.
		script.onreadystatechange = callback;
		script.onload = callback;

		// Fire the loading
		head.appendChild(script);
	}
	
	loadScript("../lib/animarGano.js",function(){});
	</script>
</body>
</html>