window.Boss1 = function() {

	this.obj = new Bitmap('./sprites/enemies/bosses/boss1.png');

	this.obj.state = 2;
	this.obj.speed = 10;
	this.obj.x = 640;
	this.obj.y = 240;
	this.obj.vx = -50;
	this.obj.vy = 0;
	this.obj.hp = 200;
	this.obj.worth = 500;

	this.obj.weapon1 = new Weapon('SINGLELINEAR');
	this.obj.weapon2 = new Weapon('SINGLEDIRECTIONAL');

	this.obj.dead = false;

	var self = this;

	this.obj.hit = function() {
		self.obj.hp--;

		if (self.obj.hp <= 0) {
			self.obj.dead = true;

			new Explosion(self.obj.x - 20, self.obj.y);
			new Explosion(self.obj.x, self.obj.y - 20);
			new Explosion(self.obj.x + 20, self.obj.y + 20);

			self.obj.state = 3;
			game.score += self.obj.worth;
			game.level.score += self.obj.worth;
			game.updateScore();

			game.bossesContainer.removeChild(self.obj);
			game.level.state = 'COMPLETE';
		}
	}
	
	this.tick = function() {
		if (self.obj.dead) {
			return false;
		}

		switch (self.obj.state) {
			case 0:
				self.obj.x += self.obj.vx * 33 / 1000;
				self.obj.y += self.obj.vy * 33 / 1000;						
				break;
			case 1:
				self.obj.vx = Math.cos(self.obj.speed * 0.05) * 50;
				self.obj.speed++;
				
				self.obj.x += self.obj.vx * 33 / 1000;
				self.obj.y += self.obj.vy * 33 / 1000;	
				
				if (self.obj.y + self.obj.image.height > game.canvas.height) {
					self.obj.y = game.canvas.height - self.obj.image.height;
					self.obj.vy *= -1;				
				}
				if (self.obj.y < 0)
				{
					self.obj.y = 0;
					self.obj.vy *= -1;
				}
				self.obj.weapon1.shoot(this.obj, null, (self.obj.y - self.obj.regY) + 20);
				self.obj.weapon2.shoot(this.obj);
				break;
			case 2:
				if (self.obj.hp > 0) {
					setTimeout(function() {
						self.obj.state = 0;
					}, 3000);	
				}
				break;
		}
		
		if (self.obj.state == 0 && self.obj.x <= 450) {
			self.obj.vx = 0;
			self.obj.vy = 80;				
			self.obj.state = 1;
		}
	}
}