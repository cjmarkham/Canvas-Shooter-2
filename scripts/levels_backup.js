var levels = [
	[{
		time:1, 
		enemyClass:'orb', 
		count:5, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:640, 
			y: 240,
			// Entry point
			angle: 180, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:270,
			// Larger for tighter turns 
			rotateSpeed:0.3
		}
	}],
	[{
		time:1, 
		enemyClass:'orb', 
		count:5, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:320, 
			y: 0,
			// Entry point
			angle: 90, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:0,
			// Larger for tighter turns 
			rotateSpeed:0.3
		}
	}]
]