var Boss = function(level) {

	var class_name = bosses[level]; 
	this.boss = new window[class_name]();

	this.hit = this.boss.hit;

	this.tick = function() {
		this.boss.tick();
	}
}