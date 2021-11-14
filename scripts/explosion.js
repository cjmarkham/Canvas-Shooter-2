var Explosion = function(x, y) {
	var spritesheet = new SpriteSheet({
        images : [game.preloader.getResult('explosion').src],
        frames : {
            width : 128,
            height : 128,
            regX : 64,
            regY : 64,
            count : 72
        },
        animations : {
            explode : [0, 71, false, 1]
        }
    });
    var explosion = new BitmapAnimation(spritesheet);
    explosion.x = x;
    explosion.y = y;
    
    game.explosionsContainer.addChild(explosion);

    explosion.gotoAndPlay('explode');

    explosion.tick = function() {
        this.x += 5;  
        this.alpha -= 0.1;  

        if (this.alpha <= 0) {  
            game.explosionsContainer.removeChild(this);  
        }  
    }
}