<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="css/bootstrap.css" />
		<style>
		body {
			margin-top:40px;
		}
		canvas {
			background:#000;
		}
		label {
			display:block;
		}
		</style>

		<script>var createjs = window;</script>
		<script src="scripts/jquery.js"></script>
		<script src="scripts/easel.js"></script>
		<script>
		var stage,
			canvas,
			ctx,
			enemy;

		var toRad = function(number) {
	        return number * Math.PI / 180;
	    }

		function tick() {
			stage.update();

			if (typeof enemy != 'undefined' && enemy.play) {
				var rtData = {
					x : parseInt($('input[name="x"]').val()),
					y : parseInt($('input[name="y"]').val()),
					speed : parseInt($('input[name="speed"]').val()),
					startAngle : toRad(parseFloat($('input[name="angle"]').val())),
					angleToRotate : toRad(parseFloat($('input[name="rotateAngle"]').val())),
					rotateSpeed : parseFloat($('input[name="rotateSpeed"]').val()),
					trajectory : 'ROTATION',
					distance : parseInt($('input[name="distance"]').val())
				}

				enemy.rtData = rtData;
				enemy.speed = rtData.speed;

				if (enemy.state == 0) {
                    var dx = enemy.x - enemy.rtData.x; 
                    var dy = enemy.y - enemy.rtData.y;          
                    var dist = Math.sqrt((dx * dx) + (dy * dy));
                    
                    if (enemy.rtData.distance - dist <= 0) {
                        enemy.state = 1;
                    }
                }

                if (enemy.state == 1) {
                    enemy.angle += enemy.rtData.rotateSpeed;
                }

                if (enemy.state == 1)
                {
                    if (Math.abs(enemy.angle - enemy.rtData.startAngle) >= enemy.rtData.angleToRotate)
                    {
                        if (enemy.rtData.rotateSpeed < 0) {
                            enemy.angle += Math.abs(enemy.angle - enemy.rtData.startAngle) - enemy.rtData.angleToRotate;
                        } else {
                            enemy.angle -= Math.abs(enemy.angle - enemy.rtData.startAngle) - enemy.rtData.angleToRotate;
                        }

                        enemy.state = 2;
                    }
                }
                
                enemy.vx = Math.cos(enemy.angle) * enemy.speed;
                enemy.vy = Math.sin(enemy.angle) * enemy.speed; 

                enemy.x += enemy.vx * 33 / 1000;
                enemy.y += enemy.vy * 33 / 1000;

                if (enemy.y > canvas.height || enemy.y < 0 || enemy.x > canvas.width || enemy.x < 0) {
                	enemy.x = parseInt($('input[name="x"]').val());
                	enemy.y = parseInt($('input[name="y"]').val());
                	enemy.vx = 0;
                	enemy.vy = 0;
                	enemy.state = 0;
                	enemy.angle = toRad(parseFloat($('input[name="angle"]').val()));
                }
			}
		}

		$(function() {
			canvas = document.getElementsByTagName('canvas')[0];
			ctx = canvas.getContext('2d');
			stage = new Stage(canvas);

			Touch.enable(this.stage);
			stage.enableMouseOver(10);

			Ticker.setFPS(30);  
        	Ticker.addListener(tick); 

        	$('#play').on('click', function(e) {
        		e.preventDefault();

        		enemy.play = true;
        	});

			$('select[name="enemies"]').on('change', function() {
				enemy = new Bitmap('./sprites/enemies/' + $(this).val() + '.png');
				enemy.x = parseInt($('input[name="x"]').val());
				enemy.y = parseInt($('input[name="y"]').val());
				enemy.angle = toRad(parseFloat($('input[name="angle"]').val()));

				enemy.state = 0;

				(function(target) {
		            enemy.onPress = function(evt) {
		                stage.addChild(target);

		                var offset = {
		                	x : target.x - evt.stageX, 
		                	y : target.y - evt.stageY
		                };

		                evt.onMouseMove = function(ev) {
		                	target.x = ev.stageX + offset.x;
		                	target.y = ev.stageY + offset.y;

		                	$('input[name="x"]').val(target.x);
		                	$('input[name="y"]').val(target.y);
		                }
		            }
		            
		        })(enemy);

				stage.addChild(enemy);

				$('[disabled]').removeAttr('disabled');
			});

			$('input[name="x"]').on('change', function() {
				enemy.x = $(this).val();
			});

			$('input[name="y"]').on('change', function() {
				enemy.y = $(this).val();
			});
		});
		</script>
	</head>

	<body class="container">
		<div class="row-fluid">
			<div class="span5">
				<form class="form-horizontal">
				<div class="control-group">
					<div class="control-label">
						Enemy
					</div>
					<div class="controls">
						<select name="enemies">
							<option selected disabled>Select Enemy</option>
							<? foreach (glob('scripts/enemies/*') as $enemy) 
							{
								if (is_file($enemy))
								{ 
									$enemy = str_replace(array('scripts/enemies/', '.js'), '', $enemy);
									echo '<option value="'.$enemy.'">'.$enemy.'</option>';
								}
							} 
							?>
						</select>
					</div>
				</div>
				<div class="control-group">
					<div class="control-label">
						Amount
					</div>
					<div class="controls">
						<input disabled type="number" name="count" value="1" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Interval
					</div>
					<div class="controls">
						<input disabled type="number" name="interval" value="0.5" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						X Pos
					</div>
					<div class="controls">
						<input disabled type="number" name="x" value="320" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Y Pos
					</div>
					<div class="controls">
						<input disabled type="number" name="y" value="240" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Speed
					</div>
					<div class="controls">
						<input disabled type="number" name="speed" value="350" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Entry Time
					</div>
					<div class="controls">
						<input type="number" disabled name="time" value="1" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Entry Angle
					</div>
					<div class="controls">
						<input type="number" disabled name="angle" value="180" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Rotate Angle
					</div>
					<div class="controls">
						<input type="number" disabled name="rotateAngle" value="270" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Distance
					</div>
					<div class="controls">
						<input type="number" disabled name="distance" value="200" />
					</div>
				</div>

				<div class="control-group">
					<div class="control-label">
						Rotate Speed
					</div>
					<div class="controls">
						<input type="text" disabled name="rotateSpeed" value="0.3" />
					</div>
				</div>

				<div class="control-group">
					<div class="controls">
						<button disabled id="play">Play</button>
					</div>
				</div>

			</div>
			<div class="span7">
				<canvas width="640" height="480"></canvas>
			</div>
		</div>
	</body>
</html>