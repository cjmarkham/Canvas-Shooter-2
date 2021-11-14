var Level = function() {
	this.current;
	this.data;
	this.state = '';
	this.levelTimer = 0;
	this.enemiesGroupIndex = 0;
	this.enemiesToCreate = [];
	this.boss = false;
	this.score = 0;
	this.levelComplete = false;

	this.bullets = {
		fired : 0,
		hit : 0
	}

	var self = this;

	this.start = function(current) {
		this.current = current;
		this.data = levels[this.current - 1];
	}

	this.tick = function() {
		this.levelTimer += 0.03;

		this.createEnemies();
        this.createTimedEnemies();
        this.removeObjects();

        this.uiUpdate();

        if (this.boss) {
        	this.boss.tick();
        }

        this.checkComplete();
	}

	this.checkComplete = function() {
		if (this.state === 'COMPLETE') {

			this.state = 'INTERVAL';

    		var scoreText = new Text('Level Score: ' + game.level.score, '24pt bold Monospace', '#fff');  
		    scoreText.textAlign = 'center';  
		    scoreText.x = 400;  
		    scoreText.y = 200;  
		    scoreText.alpha = 1;
		    scoreText.init = game.ticks;

		    var accuracy = Math.floor((this.bullets.hit  / this.bullets.fired) * 100);

		    var accuracyText = new Text('Accuracy: ' + accuracy + '%', '24pt bold Monospace', '#fff');  
		    accuracyText.textAlign = 'center';  
		    accuracyText.x = 450;  
		    accuracyText.y = 250;  
		    accuracyText.alpha = 1;
		    accuracyText.init = game.ticks;

		    var bonus = 0;

		    if (accuracy < 25) {
		    	bonus = 0;
		    } else if (accuracy > 25) {
		    	bonus = 100;
		    } else if (accuracy > 50) {
		    	bonus = 250;
		    } else if (accuracy > 75) {
		    	bonus = 500;
		    } else if (accuracy == 100) {
		    	bonus = 1000;
		    }

		    var accuracyBonus = new Text('Bonus: ' + bonus, '24pt bold Monospace', '#fff');  
		    accuracyBonus.textAlign = 'center';  
		    accuracyBonus.x = 500;  
		    accuracyBonus.y = 300;  
		    accuracyBonus.alpha = 1;
		    accuracyBonus.init = game.ticks;

		    game.score += bonus;
		    game.updateScore();

		    game.textContainer.addChild(scoreText); 
		    game.textContainer.addChild(accuracyText); 
		    game.textContainer.addChild(accuracyBonus); 
		    
		    if (levels[self.current]) {

	        	setTimeout(function() {
        			this.state = '';
	        		game.currentLevel = self.current + 1;
	        		game.loadLevel();
	        	}, 5000);
	        } else {
	        	this.levelTimer = 0;
	        	game.gameover();
	        }
        }
	}

	this.uiUpdate = function() {
		var colors = ['yellow', 'orange', 'white', 'red'];

		for (var i in game.textContainer.children) {
			var text = game.textContainer.children[i];

			text.y -= 1;
			text.color = colors[Math.floor(Utils.randRange(0, colors.length - 1))];
			text.alpha -= 0.009;

			if (text.alpha <= 0) {
				game.textContainer.removeChild(text);
			}
		}
	}

	this.createTimedEnemies = function() {
	    var objectsToRemove = [];

	    for (var i=0; i<this.enemiesToCreate.length; i++) {
	        enemyData = this.enemiesToCreate[i];
	        
	        if (enemyData.init + enemyData.interval == game.ticks) {
	            var enemy = enemyData.enemies.shift();
	            game.enemiesContainer.addChild(enemy.obj);
	            enemyData.init = game.ticks;
	        }
	        
	        if (enemyData.enemies.length == 0) {
	            objectsToRemove.push(enemyData);
	        }
	    }
	    
	    for (i=0; i<objectsToRemove.length; i++) {
	        this.enemiesToCreate.splice(this.enemiesToCreate.indexOf(objectsToRemove[i]), 1);
	        objectsToRemove[i] = null;
	    }
	}

	this.createEnemies = function() {
	    if (this.enemiesGroupIndex < this.data.length) {

	        if (this.data[this.enemiesGroupIndex].time * 30 <= game.ticks) {
	            var group = new Group();

	            group.create(this.data[this.enemiesGroupIndex]);

	            this.enemiesToCreate.push({
	                enemies : group.enemies,
	                interval : group.interval * 30,
	                maxInterval : group.interval * 30,
	                init : game.ticks
	            });

	            this.enemiesGroupIndex++;
	        }
	    } else if (!self.boss && game.state == 'PLAY') {
	    	if (this.enemiesToCreate.length == 0 && game.enemiesContainer.children.length == 0) {
	    		if (bosses[self.current-1] != 'null') {
			    	self.boss = new Boss(self.current - 1);
			    	game.bossesContainer.addChild(self.boss.boss.obj);
	    		} else {
	    			self.state = 'COMPLETE';
	    		}
	    	}
	    }
	}

	this.removeObjects = function() {
	    var enemiesToRemove = [];

	    for (var i in game.enemiesContainer.children) {
	        if (game.enemiesContainer.children[i].hp <= 0) {
	            enemiesToRemove.push(game.enemiesContainer.children[i]);
	        }
	    }

	    for (var e in enemiesToRemove) {
	        game.enemiesContainer.removeChild(enemiesToRemove[e]);
	    }
	}
}