var SingleLinear = function() {
	this.obj = new Bitmap(game.preloader.getResult('enemy-bullet').src);
	this.interval = Utils.randRange(1.0, 1.5);
	var self = this;

	this.obj.velocity = {
		x : -20,
		y : 0
	}

	this.shoot = function(enemy, x, y) {
		this.interval -= 0.03;

		if (!x) {
			x = enemy.x - enemy.regX;
		}

		if (!y) {
			y = enemy.y - enemy.regY;
		}

		if (this.interval <= 0) {

			this.obj.x = x;
	        this.obj.y = y;

	        game.enemyBulletsContainer.addChild(this.obj);

	        this.interval = Utils.randRange(1.0, 1.5);
		}
	}

	this.obj.tick = function() {

        self.obj.x += self.obj.velocity.x;
        self.obj.y += self.obj.velocity.y;

        if (self.obj.x < 0) {  
            game.enemyBulletsContainer.removeChild(self.obj);
        }  
	}
}