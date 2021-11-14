var Weapon = function(type) {
	this.obj = {};

	switch (type) {
		case 'SINGLELINEAR':
			return new SingleLinear();
		break
		case 'SINGLEDIRECTIONAL':
			return new SingleDirectional();
		break
	}
}