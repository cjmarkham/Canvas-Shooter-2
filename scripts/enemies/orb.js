var OrbEnemy = function() {
	this.sprite 	 	= 'orb.png';
	this.width 		 	= 25;
	this.height 	 	= 25;
	this.bullet 	 	= 'enemyBullet.png';
    this.fire   	 	= true;
    this.speed 		 	= 15;
    this.hp 		 	= 1;
    this.worth 		 	= 100;
    this.givePowerup 	= false;
    this.powerupImage 	= null;
    this.isRotating     = true;
    this.weapon         = 'SINGLELINEAR'
}