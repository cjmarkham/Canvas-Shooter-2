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
	}, {
		time:6, 
		enemyClass:'orb', 
		count:4, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:640, 
			y: 100,
			// Entry point
			angle: 180, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:0,
			// Larger for tighter turns 
			rotateSpeed:0.3
		}
	}, {
		time:8, 
		enemyClass:'orb2', 
		count:1, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:640, 
			y: 100,
			// Entry point
			angle: 180, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:0,
			// Larger for tighter turns 
			rotateSpeed:0.3
		}
	}, {
		time:6, 
		enemyClass:'orb', 
		count:5, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:640, 
			y: 380,
			// Entry point
			angle: 180, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:0,
			// Larger for tighter turns 
			rotateSpeed:0.3
		}
	}, {
		time:11, 
		enemyClass:'orb', 
		count:5, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:640, 
			y: 350,
			// Entry point
			angle: 180, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:300, 
			// Turning angle
			rotateAngle:180,
			// Larger for tighter turns 
			rotateSpeed:0.1
		}
	}, {
		time:16, 
		enemyClass:'orb', 
		count:5, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:300, 
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
	}, {
		time:20, 
		enemyClass:'orb', 
		count:4, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:500, 
			y: 480,
			// Entry point
			angle: 270, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:0,
			// Larger for tighter turns 
			rotateSpeed:0.3
		}
	}, {
		time:22, 
		enemyClass:'orb2', 
		count:1, 
		interval:0.5, 
		trajectory:'ROTATION', 
		params: { 
			x:500, 
			y: 480,
			// Entry point
			angle: 270, // 90 TOP 180 RIGHT 270 BOTTOM 0 LEFT
			speed:350, 
			// Pixels from edge that rotation starts
			distance:200, 
			// Turning angle
			rotateAngle:0,
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