var Powerup = function(enemy) {

	var powerup = new Bitmap(game.preloader.getResult('power-1').src);
    powerup.x = enemy.x;
    powerup.y = enemy.y - 10;

    powerup.regX = powerup.width / 2;
    powerup.regY = powerup.height / 2;

    game.powerupsContainer.addChild(powerup);

	powerup.tick = function() {
		if (game.powerupsContainer.children.length) {
	        var powerup = game.powerupsContainer.children[0];
	        powerup.x -= 2;

	        if (powerup.x < -50) {
	            game.powerupsContainer.removeChild(powerup);
	        }
	    }
	}
};