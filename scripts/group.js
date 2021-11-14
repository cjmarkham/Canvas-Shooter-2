var Group = function() {

	this.enemies = [];
	this.interval;

	this.create = function(groupData) {
		this.interval = groupData.interval;

		for (var i=0; i<groupData.count; i++) {
			var enemy = new Enemy(groupData);
			var rtData = {
				x : groupData.params.x,
				y : groupData.params.y,
				speed : groupData.params.speed,
				startAngle : Utils.toRad(groupData.params.angle),
				angleToRotate : Utils.toRad(groupData.params.rotateAngle),
				rotateSpeed : groupData.params.rotateSpeed,
				trajectory : groupData.trajectory,
				distance : groupData.params.distance,
				init : game.level.levelTimer + this.interval + i
			};

			enemy.init(rtData);

			this.enemies.push(enemy);
		}
	}
}