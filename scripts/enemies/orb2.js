var Orb2Enemy = function() {
	this.sprite 	 	= 'orb2.png';
	this.width 		 	= 25;
	this.height 	 	= 25;
	this.bullet 	 	= 'enemyBullet.png';
    this.fire   	 	= true;
    this.speed 		 	= 15;
    this.hp 		 	= 1;
    this.worth 		 	= 100;
    this.givePowerup 	= true;
    this.powerupImage 	= null;
    this.isRotating     = true;
    this.weapon         = 'SINGLEDIRECTIONAL'
}