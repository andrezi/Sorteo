var ganadores = [];
var nivel;

var closeAnimacionWiner = undefined;
sndAdrs = undefined;

window.onload = function(){  

	basil = new window.Basil();
	var tipAnm = basil.get('pirotecniaN4') + "";
	switch(tipAnm)
	{
		case "1":
			AnimarGano(); 
		break;
		case "2":
			AnimarGano2(); 
		break;
		case "3":
			AnimarGano3(); 
		break;
	}
};

function generarAleatorio(desde, hasta) {
	return Math.floor(Math.random() * (hasta - desde + 1)) + desde;
    // return Math.floor((Math.random() * hasta) + desde);
}

function GenerarSiguienteGanador(num, premio) {
	if(premio!=""){

	//alert("hola");
	
	RestablecerAnimacionPirotecnia();
    $("#copa").html("");
    $("#nUMil").css("margin-left", "1%");
	$("#nUMil").text("0").css("color","#fff");
    $("#nUnidades").text("0").css("color","#fff");
    $("#nDecenas").text("0").css("color","#fff");
    $("#nCentenas").text("0").css("color","#fff");
    $("#nDMil").text("0").css("color","#fff");

    //$("#getQuote").addClass("disabled");
    //$("#getQuote").attr("disabled", "disabled");

    var n;
	
	var iniRIng = basil.get('rangoIN4');
	if(iniRIng)
		iniRIng = parseInt(iniRIng);
	else
		iniRIng = 1;
	
	var finRIng = basil.get('rangoFN4');
	if(finRIng)
		finRIng = parseInt(finRIng);
	else
		finRIng = 99999;
	
	var validarIng = 0;
    do {		
        n = num;
        str = "" + n;
        pad = "00000";
        result = pad.substring(0, pad.length - str.length) + str;
		validarIng = validarIng + 1;
    }
    while (ganadores.indexOf(result) !== -1 && validarIng < finRIng - iniRIng);

    nivel = 1; //pad.length;
    ganadores.push(result);

    //AnimacionStar(0, 6, "#nCentenas");
    AnimacionAll();

    }
}

function AnimacionAll()
{
	var ptUM = setInterval(function(){
		var ntemp = generarAleatorio(0, 9);
		$("#nUMil").text(ntemp);
    }, 10);
    var ptU = setInterval(function () {
        var ntemp = generarAleatorio(0, 9);
        $("#nUnidades").text(ntemp);
    }, 10);
    var ptD = setInterval(function () {
        var ntemp = generarAleatorio(0, 9);
        $("#nDecenas").text(ntemp);
    }, 10);
    var ptC = setInterval(function () {
        var ntemp = generarAleatorio(0, 9);
        $("#nCentenas").text(ntemp);
    }, 10);
    var ptDM = setInterval(function () {
        var ntemp = generarAleatorio(0, 9);
        $("#nDMil").text(ntemp);
    }, 5);
    var stopAnimacion = setInterval(function () {
        switch(nivel)
        {
            case 5:
                clearInterval(ptDM);
                $("#nDMil").text(ganadores[ganadores.length - 1].substring(nivel - 1, nivel)).css("color","blue");
                break;
            case 4:
                clearInterval(ptU);
                $("#nUnidades").text(ganadores[ganadores.length - 1].substring(nivel - 1, nivel)).css("color","blue");
                break;
            case 3:
                clearInterval(ptD);
                $("#nDecenas").text(ganadores[ganadores.length - 1].substring(nivel - 1, nivel)).css("color","blue");
                break;
            case 2:
                clearInterval(ptC);
                $("#nCentenas").text(ganadores[ganadores.length - 1].substring(nivel - 1, nivel)).css("color","blue");
                break;
            case 1:
                clearInterval(ptUM);
                $("#nUMil").text(ganadores[ganadores.length - 1].substring(nivel - 1, nivel)).css("color","blue");
                break;
        }
        if (nivel !== 5) {
            nivel = nivel + 1;
        }
        else {
            clearInterval(stopAnimacion);
            SetWinner();
        }
    }, 1000);

}

function AnimacionStar(i, f, e) {
    var pt = setInterval(function () {
        var ntemp = generarAleatorio(i, f);
        $(e).text(ntemp);
    }, 200);
    setTimeout(function () {
        clearInterval(pt);
        $(e).text(ganadores[ganadores.length - 1].substring(nivel - 1, nivel));
        nivel = nivel + 1;
        CompletedAnimacion(nivel);
    }, 5720);
}

function CompletedAnimacion(nivel) {
    switch (nivel) {
        case 2:
            AnimacionStar(0, 10, "#nDecenas");
            break;
        case 3:
            AnimacionStar(0, 10, "#nUnidades");
            break;
        default:
            SetWinner();
            break;
    }
}

/*function SetWinner()
{
    $("#copa").html('<span><i class="fa" style="color:gold;" aria-hidden="true"></i></span>&nbsp;&nbsp;');
    $("#nUMil").css("margin-left","auto");
    $("#ganadores").append("<span style='font-size: 36px;'><i class='fa fa-trophy' style='color:gold;' aria-hidden='true'></i>&nbsp;<span>" + ganadores[ganadores.length - 1] + "</span></span>");
    $("#ganadores").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    $("#getQuote").removeClass("disabled");
    $("#getQuote").removeAttr("disabled", "disabled");
	AdministrarAnimacionPirotecnia();
}*/

function AdministrarAnimacionPirotecnia()
{	
	var tipAnm = basil.get('pirotecniaN4');
	if(tipAnm && tipAnm !== "0"){
		$("#nUMil").css("color","#fff");
		$("#nUnidades").css("color","#fff");
		$("#nDecenas").css("color","#fff");
		$("#nCentenas").css("color","#fff");
		$("#c").show();
	}
	  if(sndAdrs){
		  sndAdrs.muted = false;
	  }
	closeAnimacionWiner = setTimeout(function(){
		if(closeAnimacionWiner){
			clearTimeout(closeAnimacionWiner);
			closeAnimacionWiner = undefined;
			$("#c").hide();
			$("#nUMil").css("color","#161b16");
			$("#nUnidades").css("color","#161b16");
			$("#nDecenas").css("color","#161b16");
			$("#nCentenas").css("color","#161b16");
			if(sndAdrs){
			  sndAdrs.muted = true;
			}
		}
	},10000);
}

function RestablecerAnimacionPirotecnia()
{	  
	if(closeAnimacionWiner){
		clearTimeout(closeAnimacionWiner);
		closeAnimacionWiner = undefined;
	}
	if(sndAdrs){
	  sndAdrs.muted = true;
	}
	
	$("#nUMil").css("color","#161b16");
	$("#nUnidades").css("color","#161b16");
	$("#nDecenas").css("color","#161b16");
	$("#nCentenas").css("color","#161b16");
	$("#c").hide();
}


function AnimarGano3(){


// window.requestAnimFrame = (function(){
// 	return window.requestAnimationFrame ||
// 		window.webkitRequestAnimationFrame ||
// 		window.mozRequestAnimationFrame ||
// 		function (callback){
// 			window.setTimeout(callback, 1000/60);
// 		};
// })();

	var canvas = document.getElementById("c"),
		ctx = canvas.getContext("2d"),

		cw = window.innerWidth,
		ch = window.innerHeight,

		fireworks = [],
		particles = [],

		hue = 120,

		limiterTotal = 20,
		limiterTick = 0,

		timerTotal = 0,
		randomTime = 0,
		timerTick = 0,
		mousedown = false,

		mx,
		my;

	canvas.width = cw;
	canvas.height = ch;
	//$('canvas').css("background-size":cw);

	// var snd = new Audio("http://soundjax.com/reddo/38563%5EFirework.mp3"); // buffers automatically when created
	sndAdrs = new Audio("http://soundjax.com/reddo/51715%5Efirework.mp3");
	sndAdrs.muted = true;


	// now we are going to setup our function placeholders for the entire demo

	// get a random number within a range
	function random( min, max ) {
		return min + Math.random()*(max-min);
	}

	// calculate the distance between two points
	function calculateDistance( p1x, p1y, p2x, p2y ) {
		return Math.sqrt((p1x-p2x)*(p1x-p2x) + (p1y-p2y)*(p1y-p2y));
	}


	/*==================================================== Firework Class ======================================================*/
	// create firework
	function Firework( sx, sy, tx, ty ) {
		//actual coordinates
		this.x = sx;
		this.y = sy;
		//starting coordinate
		this.sx = sx;
		this.sy = sy;
		//target coordinates
		this.tx = tx;
		this.ty = ty;

		this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
		this.distanceTraveled = 0;


		//track past coordinates to creates a trail effect
		this.coordinates = [];
		this.coordinateCount = 2;

		while(this.coordinateCount--) {
			this.coordinates.push( [this.x, this.y ]);
		}
		this.angle = Math.atan2(ty - sy, tx - sx);
		this.speed = 1;
		this.acceleration = 1.2;
		this.brightness = random(50, 70);


		this.tragetRadius = 1;
	}

	// update firework
	Firework.prototype.update = function( index ) {
		// if(this.distanceTraveled >= this.distanceToTarget ){
			// fireworks.splice(index, 1);
		// }


		if( this.targetRadius < 8){
			this.targetRadius += 0.3;
		}else{
			this.targetRadius = 1;
		}

		this.speed *= this.acceleration;

		var vx = Math.cos(this.angle)*this.speed,
			vy = Math.sin(this.angle)*this.speed;

		this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

		if(this.distanceTraveled >= this.distanceToTarget ){

			this.coordinates.pop();		
			this.coordinates.unshift([this.tx, this.ty]);
			//this.x = this.tx; this.y = this.ty;
			createParticles(this.x, this.y);
			sndAdrs.play();
			this.draw();
			fireworks.splice(index, 1);
		} else {
			this.x += vx;
			this.y += vy;
		}

		this.coordinates.pop();		

		this.coordinates.unshift([this.x, this.y]);
	};

	// draw firework
	Firework.prototype.draw = function() {
		ctx.beginPath();
		// move to the last tracked coordinate in the set, then draw a line to the current x and y
		ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
		ctx.lineTo( this.x, this.y );
		ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
		ctx.stroke();


		// ctx.beginPath();
		// ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI*2);
		// ctx.stroke();
	}


	/*============================================ Particle Class ======================================================*/
	// create particle
	function Particle( x, y, type ) {
		this.x = x;
		this.y = y;
		this.type = type;
		// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
		this.coordinates = [];
		this.coordinateCount = 6;
		while( this.coordinateCount-- ) {
			this.coordinates.push( [ this.x, this.y ] );
		}

    
    // TO Be Improved //
		switch (type)
		{
			case 1: var variation = random(1, 5);
					if (variation < 2) 
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 15 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 4;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = random( hue - 50, hue + 50 );
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.01, 0.02 );

					}else if (variation < 3)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 5 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = random( hue - 50, hue );
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else if (variation < 4)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 8 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = random( hue, hue + 50 );
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 15 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = random( hue - 50, hue + 50 );
						this.brightness = random( 10, 20 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.3 );


					}
					break;

			



			case 2: var variation = random(1, 5);
					if (variation < 2) 
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 10 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 4;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 100;
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.01, 0.02 );

					}else if (variation < 3)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 21 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 100;
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else if (variation < 4)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 3 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 100;
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 5 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the othis.hue = 100;
						this.hue = 100;
						this.brightness = random( 10, 20 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.3 );


					}
					break;


			case 3: var variation = random(1, 5);
					// var hue = 10;
					if (variation < 2) 
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 10, 15 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 4;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 60;
						this.brightness = random( 10, 20 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.01, 0.02 );

					}else if (variation < 3)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 11, 15 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 10;
						this.brightness = random( 10, 20);
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else if (variation < 4)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 11, 18 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 90;
						this.brightness = random( 10, 20 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 11, 15 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 120;
						this.brightness = random( 10, 20 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.3 );


					}
					break;

			case 4: var variation = random(1, 5);
					if (variation < 2) 
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 10 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 4;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 300;
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.01, 0.02 );

					}else if (variation < 3)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 21 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 300;
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else if (variation < 4)
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 3 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = 300;
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );


					}else
					{
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 5 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 3;
						// set the hue to a random number +-20 of the othis.hue = 100;
						this.hue = 100;
						this.brightness = random( 10, 20 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.3 );


					}
					break;


			default:
		}
	}

	// update particle
	Particle.prototype.update = function( index ) {




		// slow down the particle
		this.speed *= this.friction;
		// apply velocity
		this.x += Math.cos( this.angle ) * this.speed;
		this.y += Math.sin( this.angle ) * this.speed + this.gravity;
		// fade out the particle
		// this.alpha -= this.decay * this.alpha;
		this.alpha -= this.decay;
		

		if (this.type == 4 && this.alpha <= 0.5){
			this.brightness += 50;
			this.hue += 200;
			if (this.brightness >= 200)
				this.brightness = 0;
		}

		// remove the particle once the alpha is low enough, based on the passed in index
		if( this.alpha <= this.decay ) {
			particles.splice( index, 1 );
		}

		// remove last item in coordinates array
		this.coordinates.pop();
		// add current coordinates to the start of the array
		this.coordinates.unshift( [ this.x, this.y ] );


	}

	// draw particle
	Particle.prototype.draw = function() {
		ctx. beginPath();
		// move to the last tracked coordinates in the set, then draw a line to the current x and y
		ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
		ctx.lineTo( this.x, this.y );
		ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
		ctx.stroke();

	}

	// create particle group/explosion
	function createParticles( x, y ) {
		var particleCount = 300;
		var type = Math.floor(random(1, 5));
		while(particleCount--){
			particles.push(new Particle(x, y, type));
		}
	}


	/*============================================ Game loop ======================================================*/
	// main demo loop
	function loop() {
		//requestAnimFrame(loop);
		hue += 0.5;
		ctx.globalCompositeOperation = "destination-out";
		ctx.fillStyle =  'rgba(0, 0, 0, 0.3)';
		ctx.fillRect(0, 0, cw, ch);

		ctx.globalCompositeOperation = "lighter";

		var i = fireworks.length;
		while(i--)
		{
			fireworks[i].draw();
			fireworks[i].update(i);
		}

		// loop over each particle, draw it, update it
		var i = particles.length;
		while( i-- ) {
			particles[ i ].draw();
			particles[ i ].update( i );
		}

		if( timerTick >= timerTotal + randomTime ){
			if (!mousedown){
				/* uniform */
				// fireworks.push( new Firework(cw/2, ch, 100, random(0, ch/2)));
				/* 0 to cw/2, more to*/
				// fireworks.push( new Firework(cw/2, ch, Math.floor(Math.sqrt(random(0, cw*cw/4))), random(0, ch/2)));
				
				var xPos = Math.pow(Math.floor((random(-Math.pow(cw/2, 1/3), Math.pow(cw/2, 1/3)))), 3);
				xPos += cw/2;
				fireworks.push( new Firework(cw/2, ch, xPos, random(0, ch/2)));
				// fireworks.push( new Firework(cw/2, ch, random(-10, 100), random(0, ch/2)));

				timerTick = 0;
				randomTime = Math.pow(random(2, 4), 2);
			} 
		} else {
			timerTick++;
		}


		// limit the rate at which fireworks get launched when mouse is down
		if( limiterTick >= limiterTotal ) {
			if( mousedown ) {
				// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
				fireworks.push( new Firework( cw / 2, ch, mx, my ) );
				limiterTick = 0;
			} else {
				limiterTick= limiterTotal;
			}
		} else {
			limiterTick++;
		}
		
	}

	// mouse event bindings
	// update the mouse coordinates on mousemove
	canvas.addEventListener( 'mousemove', function( e ) {
		mx = e.pageX - canvas.offsetLeft;
		my = e.pageY - canvas.offsetTop;
	});

	// toggle mousedown state and prevent canvas from being selected
	canvas.addEventListener( 'mousedown', function( e ) {
		e.preventDefault();
		mousedown = true;
	});

	canvas.addEventListener( 'mouseup', function( e ) {
		e.preventDefault();
		mousedown = false;
	});

	setInterval(loop, 25);

	// (function game(){
	// 	loop();
	// 	setTimeout(game, Math.floor(random(30, 30)));
	// })();

window.addEventListener( 'resize', function(){
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})
// once the window loads, we are ready for some fireworks!
// window.onload = loop;

	
}


function AnimarGano2()
{// Code by Matheus Lin
// While developing a version of "Chain Reaction", I ended up on
// those "fireworks-like" things. I leave it to you here.
// Chain Reaction coming up next!

// Configs

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var minVx = -10;
var deltaVx = 20;
var minVy = 25
var deltaVy = 15;
var minParticleV = 5;
var deltaParticleV = 5;

var gravity = 1;

var explosionRadius = 200;
var bombRadius = 10;
var explodingDuration = 100;
var explosionDividerFactor = 10; // I couldn't find a better name. Got any?

var nBombs = 1; // initial
var percentChanceNewBomb = 5;

// Color utils forked from http://andreasstorm.com/
// (or someone who forked from there)

function Color(min) {
  min = min || 0;
  this.r = colorValue(min);
  this.g = colorValue(min);
  this.b = colorValue(min);
  this.style = createColorStyle(this.r, this.g, this.b);
};

function colorValue(min) {
  return Math.floor(Math.random() * 255 + min);
}

function createColorStyle(r,g,b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}

// A Bomb. Or firework.
function Bomb(){
  var self = this;
  
  self.radius = bombRadius;
  self.previousRadius = bombRadius;
  self.explodingDuration = explodingDuration;
  self.hasExploded = false;
  self.alive = true;
  self.color = new Color();
  
  self.px = (window.innerWidth / 4) + (Math.random() * window.innerWidth / 2);
  self.py = window.innerHeight;
  
  self.vx = minVx + Math.random() * deltaVx;
  self.vy = (minVy + Math.random() * deltaVy) * -1; // because y grows downwards

  self.duration = 

  self.update = function(particlesVector){
    if(self.hasExploded){
      var deltaRadius = explosionRadius - self.radius;
      self.previousRadius = self.radius;
      self.radius += deltaRadius / explosionDividerFactor;
      self.explodingDuration--;
      if(self.explodingDuration == 0){
        self.alive = false;
      }
    }
    else{
      self.vx += 0;
      self.vy += gravity;
      if(self.vy >= 0){ // invertion point
        self.explode(particlesVector);
      }

      self.px += self.vx;
      self.py += self.vy;
    }
  };

  self.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(self.px, self.py, self.previousRadius, 0, Math.PI * 2, false);
    if(self.hasExploded){
    }
    else{
      ctx.fillStyle = self.color.style;
      ctx.lineWidth = 1;
      ctx.fill();
    }
    
  };
  

  self.explode = function(particlesVector){
    self.hasExploded = true;
    var e = 3 + Math.floor(Math.random() * 3);
    for(var j = 0; j < e; j++){
      var n = 10 + Math.floor(Math.random() * 21); // 10 - 30
      var speed = minParticleV + Math.random() * deltaParticleV;
      var deltaAngle = 2 * Math.PI / n;
      var initialAngle = Math.random() * deltaAngle;
      for(var i = 0; i < n; i++){
        particlesVector.push(new Particle(self,  i * deltaAngle + initialAngle, speed));
      }
    }
  };
  
}

function Particle(parent, angle, speed){
  var self = this;
  self.px = parent.px;
  self.py = parent.py;
  self.vx = Math.cos(angle) * speed;
  self.vy = Math.sin(angle) * speed;
  self.color = parent.color;
  self.duration = 40 + Math.floor(Math.random()*20);
  self.alive = true;

  self.update = function(){
    self.vx += 0;
    self.vy += gravity / 10;

    self.px += self.vx;
    self.py += self.vy;
    self.radius = 3;

    self.duration--;
    if(self.duration <= 0){
      self.alive = false;
    }
  };

  self.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(self.px, self.py, self.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = self.color.style;
    ctx.lineWidth = 1;
    ctx.fill();
  };

}

function Controller(){
  var self = this;
  self.canvas = document.getElementById("c");
  self.canvas.width = screenWidth;
  self.canvas.height = screenHeight;
  self.ctx = self.canvas.getContext('2d');

  function setSpeedParams(){
    var heightReached = 0;
    var vy = 0;

    while(heightReached < screenHeight && vy >= 0){
      vy += gravity;
      heightReached += vy;
    }

    minVy = vy / 2;
    deltaVy = vy - minVy;

    vx = (1 / 4) * screenWidth / (vy / 2);
    minVx = -vx;
    deltaVx = 2*vx;
  };

  

  self.resize = function(){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    self.canvas.width = screenWidth;
    self.canvas.height = screenHeight;
    setSpeedParams();
  };
  self.resize();

  window.onresize = self.resize;

  self.init = function(){
    self.readyBombs = [];
    self.explodedBombs = [];
    self.particles = [];

    for(var i = 0; i < nBombs; i++){
      self.readyBombs.push(new Bomb());
    }
  }

  self.update = function(){
    var aliveBombs = [];
    while(self.explodedBombs.length > 0){
      var bomb = self.explodedBombs.shift();
      bomb.update();
      if(bomb.alive){
        aliveBombs.push(bomb);
      }
    }
    self.explodedBombs = aliveBombs;

    var notExplodedBombs = [];
    while(self.readyBombs.length > 0){
      var bomb = self.readyBombs.shift();
      bomb.update(self.particles);
      if(bomb.hasExploded){
        self.explodedBombs.push(bomb);
      }
      else{
        notExplodedBombs.push(bomb);
      }
    }
    self.readyBombs = notExplodedBombs;

    var aliveParticles = [];
    while(self.particles.length > 0){
      var particle = self.particles.shift();
      particle.update();
      if(particle.alive){
        aliveParticles.push(particle);
      }
    }
    self.particles = aliveParticles;
  }

  self.draw = function(){
    self.ctx.beginPath();
    self.ctx.fillStyle='rgba(0, 0, 0, 0.1)'; // Ghostly effect
    self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
    
    
    
    for(var i = 0; i < self.readyBombs.length; i++){
      self.readyBombs[i].draw(self.ctx);
    }

    for(var i = 0; i < self.explodedBombs.length; i++){
      self.explodedBombs[i].draw(self.ctx);
    }

    for(var i = 0; i < self.particles.length; i++){
      self.particles[i].draw(self.ctx);
    }

  }

  self.animation = function(){
    self.update();
    self.draw();
    
   if(Math.random() * 100 < percentChanceNewBomb) {
     self.readyBombs.push(new Bomb());
   }
    
        
    requestAnimationFrame(self.animation);
  }
}

var controller = new Controller();
controller.init();
requestAnimationFrame(controller.animation);
}

