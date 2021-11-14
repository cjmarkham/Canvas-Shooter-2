var SingleDirectional = function() {
	this.obj = new Bitmap(game.preloader.getResult('enemy-bullet-2').src);
	this.interval = Utils.randRange(1.2, 1.7);
	var self = this;
	this.direction = 180;
	this.angle;

	this.obj.velocity = {
		x : -20,
		y : 0
	}

	this.shoot = function(enemy) {

		this.interval -= 0.03;

		if (this.interval <= 0) {

			self.direction = Math.atan2(game.player.obj.y - enemy.y, game.player.obj.x - enemy.x) * (180 / Math.PI);

	        game.enemyBulletsContainer.addChild(this.obj);
	        self.obj.x = enemy.x;
	        self.obj.y = enemy.y;

	        self.angle = self.direction * Math.PI / 180;
	        self.obj.rotation = (self.direction + Math.PI + 180);

			self.obj.velocity = {
	            x : Math.cos(self.angle) * 20,
	            y : Math.sin(self.angle) * 20
	        }

	        this.interval = Utils.randRange(1.2, 1.7);
		}
	}

	this.obj.tick = function() {

        self.obj.x += self.obj.velocity.x;
        self.obj.y += self.obj.velocity.y;

        if(self.obj.x < -150) {  
            game.enemyBulletsContainer.removeChild(self.obj);
        }  
	}
}
