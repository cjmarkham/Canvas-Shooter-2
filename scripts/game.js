var Game = function() {
    var self = this;

    self.stage = {};
    self.canvas = {};
    self.ctx = {};
    self.loader = {};
    self.preloader = {};
    self.player = {};
    self.paused = false;
    self.playerBulletsContainer = {};
    self.enemyBulletsContainer = {};
    self.enemiesContainer = {};
    self.explosionsContainer = {};
    self.bossesContainer = {};
    self.ticks = 0;
    self.state = 'MAIN_MENU';
    self.level = 1;
    self.currentLevel = 1;
    self.score = 0;
    self.bgCanvas = {};
    self.bgCtx = {};
    self.background = {};
    self.stars = [];
    self.starSpeeds = [4, 6, 10];
    self.starColors = ['#555', '#aaa', '#fff'];

    self.initStars = function() {
        for (var i=0; i<250; i++) { 
            var x = Math.floor(Math.random() * self.canvas.width);
            var y = Math.floor(Math.random() * self.canvas.height);
            var speed = Math.floor(Math.random() * 3);

            self.stars.push({x: x, y: y, speed: speed});
        }
    }

    self.updateStars = function() {
        for (var i=0; i<self.stars.length; i++) {
            self.stars[i].x -= self.starSpeeds[self.stars[i].speed];

            if (self.stars[i].x <= 0) {  
                self.stars[i].y = Math.floor(Math.random() * self.canvas.height);                           
                self.stars[i].x = self.canvas.width; 
            }                                   
        }                             

        self.bgCtx.fillStyle = "rgb(0,0,0)"; 
        self.bgCtx.fillRect(0, 0, self.canvas.width, self.canvas.height); 

        for (i=0; i<self.stars.length; i++) {
            self.bgCtx.fillStyle = self.starColors[self.stars[i].speed];
            self.bgCtx.fillRect(self.stars[i].x, self.stars[i].y, 1, 1);
        }
    }

    self.onKeyDown = function(e) {  
        switch(e.keyCode) {  
            // left  
            case 37: 
                self.player.moveLeft = true; 
                self.player.moveRight = false;  
            break;  
            // up  
            case 38:
                self.player.moveUp = true; 
                self.player.moveDown = false;  
            break;  
            // right  
            case 39:
                self.player.moveRight = true; 
                self.player.moveLeft = false;  
            break;  
            // down  
            case 40: 
                self.player.moveDown = true; 
                self.player.moveUp = false;  
            break;
            case 32:
                self.player.fireHeld = true;
            break; 
        }  
    }  

    self.onKeyUp = function(e) {  
         switch(e.keyCode) {  
            // left  
            case 37: 
                self.player.moveLeft = false;  
            break;  
            // up  
            case 38: 
                self.player.moveUp = false;  
            break;  
            // right  
            case 39: 
                self.player.moveRight = false;  
            break;  
            // down  
            case 40:
                self.player.moveDown = false;  
            break;
            case 32:
                self.player.fireHeld = false;
            break;
        }  
    }

    self.init = function() {
        self.wrapper = document.getElementById('wrapper');
        self.loader = document.getElementById('loading');
        self.canvas = document.getElementById('canvas');
        self.bgCanvas = document.createElement('canvas');

        self.bgCanvas.style.position = 'absolute';
        self.bgCanvas.width = self.canvas.width;
        self.bgCanvas.height = self.canvas.height;

        wrapper.appendChild(self.bgCanvas);

        self.ctx = self.canvas.getContext('2d');
        self.bgCtx = self.bgCanvas.getContext('2d');
        self.stage = new Stage(self.canvas);

        Ticker.setFPS(30);  
        Ticker.addListener(self.tick); 

        document.onkeydown = self.onKeyDown;
        document.onkeyup = self.onKeyUp;

        self.playerBulletsContainer = new Container(),
        self.enemyBulletsContainer = new Container(),
        self.enemiesContainer = new Container(),
        self.explosionsContainer = new Container(),
        self.powerupsContainer = new Container(),
        self.textContainer = new Container(),
        self.bossesContainer = new Container()

        self.stage.addChild(
            self.playerBulletsContainer,
            self.enemyBulletsContainer,
            self.enemiesContainer,
            self.explosionsContainer,
            self.powerupsContainer,
            self.textContainer,
            self.bossesContainer
        );

        self.setState('MAIN_MENU');
        self.levels = levels;

        loading.getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.width = '0px';
        $('#loading span').text(0);

        var levelManifest = [{
            id : 'background',
            src : './backgrounds/space.jpg'
        }, {
             id : 'orb',
            src : './sprites/orb.png'
        }, {
            id : 'player-plane',
            src : './sprites/player-single.png'
        }, {
            id : 'bullet-1',
            src : './sprites/bullet2.png'
        }, {
            id : 'enemy-bullet',
            src : './sprites/enemyBullet.png'
        }, {
            id : 'enemy-bullet-2',
            src : 'sprites/enemyBullet2.png'
        }, {
            id : 'explosion',
            src : 'sprites/explosion.png'
        }, {
             id : 'power-1',
            src : 'sprites/pow1.png'
        }, {
             id : 'orb-bullet',
            src : 'sprites/bullet.png'
        }, {
             id : 'orb2',
            src : 'sprites/enemies/orb2.png'
        }];

        self.preloader = new PreloadJS(true);
        self.preloader.onProgress = self.handleProgress;
        self.preloader.onComplete = self.loaded;
        self.preloader.onFileLoad = self.handleFileLoad;
        self.preloader.loadManifest(levelManifest);

        self.initStars();
    }

    self.setState = function(state) {
        self.state = state;

        if (self.state === 'PLAY') {
            self.loadLevel();
        }
    }

    self.gameover = function() {
        self.setState('MAIN_MENU');
        self.level = {};
        self.currentLevel = 1;
        self.score = 0;
        self.updateScore();

        self.playerBulletsContainer.removeAllChildren();
        self.enemyBulletsContainer.removeAllChildren();
        self.enemiesContainer.removeAllChildren();
        self.explosionsContainer.removeAllChildren();
        self.powerupsContainer.removeAllChildren();
        self.textContainer.removeAllChildren();
        self.bossesContainer.removeAllChildren();
        self.ticks = 0;
        self.player.reset();

        $('#ui-bottom > ul > li').removeClass().eq(0).addClass('active');

        $('#main-menu').fadeIn(500);
    }

    self.loadLevel = function() {
        $('#main-menu').fadeOut(400);
        self.level = new Level();
        self.level.start(self.currentLevel);
    }

    self.handleProgress = function() {
        $('#loading span').text(self.preloader.progress*100|0);
        loading.getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.width = (self.preloader.progress*100|0) + '%';
    }

    self.handleFileLoad = function(event) {
        $('#loading p').text(event.id);

        if (event.id === 'player-plane') {
            self.playerLoaded();
        } else if (event.id === 'background') {
            self.background = new Image();
            self.background.src = self.preloader.getResult('background').src;
            self.background.onload = self.renderBackground();
            self.background.vx = 0;
        }
    }

    self.loaded = function() {
        $('#loading').fadeOut(10);
        $('#main-menu').fadeIn(0);
    }

    self.playerLoaded = function() {
        var spriteSheet = new SpriteSheet({
            images: [self.preloader.getResult('player-plane').src], 
            frames: {
                width: 480, 
                height: 256, 
                regX: 240, 
                regY: 128
            }, 
            animations: {    
                down: [3, 4, 'down'],
                up: [0, 1, 'up'],
                none: [2, 2, 'none']
            }
        });
     
        self.player = new Player(spriteSheet);
        self.player.init();
    }

    self.tick = function() {
       if (!self.paused && self.state === 'PLAY') {

            self.updateStars();

            detectCollisions();
            
            self.level.tick();
            self.ticks++;
            self.player.tick();

            for (var i in self.enemiesContainer.children) {
                var enemy = self.enemiesContainer.children[i];
                enemy.tick();
            }

            for (var i in self.enemyBulletsContainer.children) {
                self.enemyBulletsContainer.children[i].tick();
            }

            for(var i in self.explosionsContainer.children) {  
                var explosion = self.explosionsContainer.children[i];
                explosion.tick();
            }

            for(var i in self.powerupsContainer.children) {  
                var powerup = self.powerupsContainer.children[i];

                powerup.tick();
            }

            self.stage.update();
        }
    }

    self.renderBackground = function() {

        /*self.bgCtx.clearRect(0, 0, self.canvas.width, self.canvas.height);

        if(self.background.vx >= self.canvas.width){
            self.background.vx = 0;
        }

        self.background.vx += 10;                   
     
        self.bgCtx.drawImage(self.background,-self.background.vx, 0, self.background.width, self.background.height);
        self.bgCtx.drawImage(self.background, self.canvas.width-self.background.vx, 0, self.background.width, self.background.height);

        setTimeout(function(){
            self.renderBackground();
        }, 10);*/

    }

    self.updateScore = function() {
        document.getElementById('score').innerText = Utils.pad(game.score, 10);
    }
}

var Utils = {
    randRange : function(min, max) {  
        return Math.random() * (max - min) + min;  
    },

    round : function(num, dec) {
        var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
        return result;
    },

    pad : function(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
       
        return str;
    },

    toRad : function(number) {
        return number * Math.PI / 180;
    }
}

var enemies = [];

var timePassed = 0;

function detectCollisions() {  

    var enemy, curBullet, enemyBullet;  

    if (game.player.active) {
        for (var i in game.powerupsContainer.children) {  
            var powerup = game.powerupsContainer.children[i];

            if (ndgmr.checkPixelCollision(powerup, game.player.obj)) {
                game.powerupsContainer.removeChild(powerup);
                game.player.powerup();
            }
        }
    }

    for (var i in game.bossesContainer.children) {  
        boss = game.bossesContainer.children[i];

        // check player/boss collision 
        if (game.player.active) { 
            if(ndgmr.checkPixelCollision(boss, game.player.obj)) {   
                game.player.damage();
                boss.hit();

                if (game.player.hp <= 0) {
                    endGame();
                }
            }
        }

        // check bullet/boss collision  
        for (var j in game.playerBulletsContainer.children) {  
            curBullet = game.playerBulletsContainer.children[j];

            if (curBullet.x > game.canvas.width) {
                collision = false;
            } else {
                collision = ndgmr.checkPixelCollision(curBullet, boss);
            }

            if (collision) {
                game.playerBulletsContainer.removeChild(curBullet);
                boss.hit(curBullet);
            }  
        }
    }

    //check enemy bullet/player collision
    for(var k in game.enemyBulletsContainer.children) {  
        enemyBullet = game.enemyBulletsContainer.children[k];  

        if (game.player.active) {
            if (ndgmr.checkPixelCollision(game.player.obj, enemyBullet, 0.2))  {  
                game.player.damage();

                new Explosion(enemyBullet.x, enemyBullet.y);
                game.enemyBulletsContainer.removeChild(enemyBullet);

                if (game.player.hp <= 0) {
                    endGame();
                }
            }  
        }
    }

    for (var i in game.enemiesContainer.children) {  
        enemy = game.enemiesContainer.children[i];

        // check player/enemy collision  
        if (game.player.active) {
            if(ndgmr.checkPixelCollision(enemy, game.player.obj)) {   
                game.player.damage();
                enemy.kill();

                if (game.player.hp <= 0) {
                    endGame();
                }
            }
        }

        // check bullet/enemy collision  
        for (var j in game.playerBulletsContainer.children) {  
            curBullet = game.playerBulletsContainer.children[j];

            if (curBullet.x > game.canvas.width) {
                collision = false;
            } else {
                collision = ndgmr.checkPixelCollision(curBullet, enemy);
            }

            if (collision) {
                game.level.bullets.hit++;
                game.playerBulletsContainer.removeChild(curBullet);
                enemy.hit(curBullet);
            }  
        }
    }
}  

function screenShake() {
    game.bgCanvas.style.top = '-5px';
    
    setTimeout(function() {
        game.bgCanvas.style.top = '-5px';
        game.bgCanvas.style.left = '5px';
    }, 50);

    setTimeout(function() {
        game.bgCanvas.style.left = '0';
        game.bgCanvas.style.top = '0';
    }, 100);
}