var Enemy = function(data) {
    this.obj = {};
    var self = this;
    this.data = data;

    this.init = function(rtData) {

        switch (this.data.enemyClass) {
            case 'orb':
                var enemy = new OrbEnemy();
            break; 
            case 'orb2':
                var enemy = new Orb2Enemy();
            break; 
        } 

        this.obj = new Bitmap(game.preloader.getResult(enemy.sprite.replace('.png', '')).src);

        this.obj.x = rtData.x;
        this.obj.y = rtData.y;

        this.obj.init = rtData.init;

        this.obj.regX = enemy.width / 2;
        this.obj.regY = enemy.height / 2;

        this.obj.bullet = enemy.bullet;
        this.obj.scaleX = 1;
        this.obj.scaleY = 1;
        this.obj.firer = enemy.fire;
        this.obj.speed = rtData.speed;
        this.obj.hp = enemy.hp;
        this.obj.givePowerup = enemy.givePowerup;
        this.obj.powerupImage = enemy.powerupImage;
        this.obj.worth = enemy.worth;
        this.obj.rtData = rtData;

        this.obj.tick = this.tick;
        this.obj.hit = this.hit;
        this.obj.kill = this.kill;
        this.obj.fire = this.fire;

        this.obj.isRotating = enemy.isRotating;

        this.obj.state = 0;

        this.obj.angle = rtData.startAngle;

        this.weapon = new Weapon(enemy.weapon);
    }

    this.tick = function() {

        switch (self.obj.rtData.trajectory) {
            case 'ROTATION':
                if (self.obj.state == 0) {
                    var dx = self.obj.x - self.obj.rtData.x; 
                    var dy = self.obj.y - self.obj.rtData.y;          
                    var dist = Math.sqrt((dx * dx) + (dy * dy));
                    
                    if (self.obj.rtData.distance - dist <= 0) {
                        self.obj.state = 1;
                    }
                }

                if (self.obj.state == 1) {
                    self.obj.angle += self.obj.rtData.rotateSpeed;
                }

                if (self.obj.state == 1)
                {
                    if (Math.abs(self.obj.angle - self.obj.rtData.startAngle) >= self.obj.rtData.angleToRotate)
                    {
                        if (self.obj.rtData.rotateSpeed < 0) {
                            self.obj.angle += Math.abs(self.obj.angle - self.obj.rtData.startAngle) - self.obj.rtData.angleToRotate;
                        } else {
                            self.obj.angle -= Math.abs(self.obj.angle - self.obj.rtData.startAngle) - self.obj.rtData.angleToRotate;
                        }

                        self.obj.state = 2;
                    }
                }
                
                self.obj.vx = Math.cos(self.obj.angle) * self.obj.speed;
                self.obj.vy = Math.sin(self.obj.angle) * self.obj.speed; 
                
                if (self.obj.isRotating) {
                    //self.obj.rotation = -(Math.atan2(self.obj.vx, self.obj.vy) + Math.PI / 2);
                }

                self.obj.x += self.obj.vx * 33 / 1000;
                self.obj.y += self.obj.vy * 33 / 1000;
            break;
        }

        if (self.obj.x < -50 || self.obj.y < -50 || self.obj.y > canvas.height + 50 || self.obj.x > canvas.width + 50) {  
            game.enemiesContainer.removeChild(self.obj);  
        }

        self.weapon.shoot(self.obj);
    }

    this.hit = function(bullet) {
        
        self.obj.hp -= bullet.power;

        if (self.obj.hp <= 0) {
            self.obj.kill();
        } else {
            new Explosion(self.obj.x, self.obj.y);
            screenShake();
        }
    }

    this.kill = function() {
        new Explosion(self.obj.x, self.obj.y);
        self.obj.hp = 0;
        screenShake();

        if (self.obj.givePowerup) {
            new Powerup(self.obj);
        }

        game.score += self.obj.worth;
        game.level.score += self.obj.worth;

        game.enemiesContainer.removeChild(self.obj);
        game.updateScore();
    }
}