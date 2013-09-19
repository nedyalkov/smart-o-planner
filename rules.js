// TODO: Check the following:
// http://mourner.github.io/simplify-js/
// machine learning - https://npmjs.org/package/mokolo
// collision-detection - http://www.codeproject.com/Articles/15573/2D-Polygon-Collision-Detection
(function() {
    var Class = require('./modules/oop').Class;
	
	var identityFunction = function(x) { return x; };
	var quadraticFunction = function(x) { return 1 - (2 * x - 1) * (2 * x - 1); };
	
	var add = function(previousValue, currentValue, index, array) { return previousValue + currentValue; };	
	var getArea = function(item) { return item.boundaries.area(); };
	
	var ConcentrationRule = Class.extend({
		init: function(min, max) {
			this.min = min;
			this.max = max;
		},
		rate: function(roomBoundary, roomArtifacts, arrangmentObjects) {
			var roomArea = roomBoundary.area();
			var artifactsArea = roomArtifacts.map(getArea).reduce(add, 0);
			var freeSpace = roomArea - artifactsArea;
			var concentration = freeSpace / arrangmentObjects.length;
			var concentrationRange = this.max - this.min;
			var concentrationOffset = Math.min(concentrationRange, Math.max(0, concentration - this.min));
			return this.ratingFunction(concentrationOffset / concentrationRange);
        },
		ratingFunction: identityFunction
	});
	
	exports.ConcentrationRule = ConcentrationRule;
	exports.identityFunction = identityFunction;
	exports.quadraticFunction = quadraticFunction;	
})();