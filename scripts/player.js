var Player = function(spriteSheet) {
	var self = this;

	self.init = function() {
		self.obj 		= {};
	    self.special 	= 1;
	    self.hp 		= 50;
	    self.speed 		= 1;
	    self.img		= '';

		self.fireHeld   = false;

		/*self.obj = new createjs.BitmapAnimation(spriteSheet);
	    self.obj.gotoAndPlay('none');
	    self.obj.currentFrame = 2;*/

	    self.obj = new Bitmap(game.preloader.getResult('player-plane').src);

	    self.obj.x    = 80; 
	    self.obj.y    = 240;
	    self.obj.scaleX = 1;
	    self.obj.scaleY = 1;

	    self.lastBullet = 0;
	    self.orbs = [];

	    self.moveUp    = false;
	    self.moveDown  = false;
	    self.moveLeft  = false;
	    self.moveRight = false;

	    self.active = true;

	    game.stage.addChild(self.obj);
	}

    self.damage = function() {
    	self.hp--;
        self.special = 1;
        screenShake();

        self.active = false;

        self.obj.x = -100;

        setTimeout(function() {
			self.respawn = true;        	
        }, 1000);

        if (self.orbs.length) {
			for (var i=0; i<self.orbs.length; i++) {
				self.orbs[i].kill();
			}
		}

		$('#ui-bottom > ul > li').removeClass().eq(0).addClass('active');
    }

	self.fire = function() {
		if (!self.active) {
			return false;
		}

		if (self.lastBullet < (new Date().getTime()) - 150) {
	        if (game.playerBulletsContainer.children.length < 15) {
	            
	            if (self.orbs.length) {
	            	for (var i in self.orbs) {
	            		var orb = self.orbs[i];

						orb.fire();
					}
				}

	            switch (self.special) {
	            	case 1:
	            	case 2:
	            		var bullet = new Bitmap(game.preloader.getResult('bullet-1').src);  
		                bullet.x = self.obj.x + self.obj.regX;
		                bullet.y = self.obj.y - self.obj.regY;  
		                bullet.power = 1;
		                game.level.bullets.fired++;

		                game.playerBulletsContainer.addChild(bullet);
	            		break;
	                case 3:
	                case 4:
	                	var bullet = new Bitmap(game.preloader.getResult('bullet-1').src);  
		                bullet.x = self.obj.x + self.obj.regX;
		                bullet.y = self.obj.y - self.obj.regY + 10;  
		                bullet.power = 1;
		                game.level.bullets.fired++;

	                    var bullet2 = new Bitmap(game.preloader.getResult('bullet-1').src);  
	                    bullet2.x = self.obj.x + self.obj.regX;
	                    bullet2.y = (self.obj.y - self.obj.regY) - 10;  
	                    bullet2.power = 1;

	                    game.playerBulletsContainer.addChild(bullet);
	                    game.playerBulletsContainer.addChild(bullet2);
	                    break;
	                case 5:
	                	var bullet = new Bitmap(game.preloader.getResult('bullet-1').src);  
		                bullet.x = self.obj.x + self.obj.regX + 20;
		                bullet.y = self.obj.y - self.obj.regY  
		                bullet.power = 1;
		                game.level.bullets.fired++;

	                    var bullet2 = new Bitmap(game.preloader.getResult('bullet-1').src);  
	                    bullet2.x = self.obj.x + self.obj.regX + 40;
	                    bullet2.y = self.obj.y - self.obj.regY + 35;  
	                    bullet2.power = 1;
	                    bullet2.rotation = -45;

	                    game.playerBulletsContainer.addChild(bullet);
	                    game.playerBulletsContainer.addChild(bullet2);
	                    break;
	            }

	            self.lastBullet = new Date().getTime();
	        }
	    }
	}

	self.createOrb = function() {
		if (self.orbs.length == 1) {
			return false;
		}

		var orb = new Bitmap(game.preloader.getResult('orb').src);
		orb.scaleX = orb.scaleY = 1;

		orb.kill = function() {
			self.orbs.splice(orb, 1);
			game.stage.removeChild(orb);
		}

		orb.fire = function() {
			var bullet = new Bitmap(game.preloader.getResult('orb-bullet').src);  
	        bullet.x = orb.x;
	        bullet.y = orb.y;  
	        bullet.power = 0.5;

	        bullet.scaleX = bullet.scaleY = 0.5;

	        game.playerBulletsContainer.addChild(bullet);
		}

		self.orbs.push(orb);
		game.stage.addChild(orb);
	}

	self.reset = function() {
		game.stage.removeChild(self.obj);

		if (self.orbs.length) {
			for (var i in self.orbs) {
				self.orbs[i].kill();
			}
		}
		
		self.init();
	}

	self.updateBullets = function() {
	    for(var i in game.playerBulletsContainer.children) {  
	        var bullet = game.playerBulletsContainer.children[i];

	        bullet.x += 30; 

	        if (bullet.rotation != 0) {
	        	bullet.y += -30;
	        }

	        if (game.playerBulletsContainer.children[i].x > game.canvas.width + 50) {  
	            game.playerBulletsContainer.removeChild(game.playerBulletsContainer.children[i]);  
	        }  
	    }  
	}

	self.powerup = function() {
		self.special++;

		if (self.special > 0) {
    		if (self.special > 5) {
                self.special = 5;
            }

            switch (self.special) {
            	case 2:
            		self.createOrb();
            		break;
            }
    	}

    	$('#ui-bottom > ul > li').removeClass().eq(self.special - 1).addClass('active');
	}

    self.tick = function() {

    	if (self.respawn) {
    		self.obj.alpha = (game.ticks % 2 == 0) ? 1 : 0;

    		self.obj.x += 5;
    		self.obj.y = 240;

    		if (self.obj.x >= 100) {
    			self.obj.alpha = 1;
				self.respawn = false;
				self.active = true;
    		}
    	} 

    	if (self.active) {
	    	if (self.moveLeft) {  

		        self.obj.x -= 10;

		        if (self.obj.x <= 0) {
		           self.obj.x = 0; 
		        }
		    } else if (self.moveRight) {  

		        self.obj.x += 10;  

		        if (self.obj.x > 740) {
		            self.obj.x = 740;
		        } 
		    }   
		    
		    if (self.moveUp) {  

		        if (self.obj.y - 10 > 60) {
		            self.obj.y -= 10;  
		        }
		    } else if (self.moveDown) {     
		        
		        if (self.obj.y + 10 < 420) {
		            self.obj.y += 10; 
		        }
		    } 

	    	if (self.fireHeld) {
		    	self.fire();
		    }
	    }

	    self.updateBullets();

	    if (self.orbs.length) {
    		for (var i in self.orbs) {
    			var orb = self.orbs[i];

	    		orb.offsetX = ( Math.cos(game.ticks / 10) * i * 10);
			    orb.offsetY = ( Math.sin(game.ticks / 7) * 5);
			    orb.x = orb.x + (self.obj.x - orb.x) * .1 + orb.offsetX;
			    orb.y = orb.y + (self.obj.y - orb.y) * .1 + orb.offsetY;
    		}
    	}
    }
}