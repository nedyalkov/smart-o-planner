(function() {
    var Class = require('./oop').Class;

	var Polygon = Class.extend({
		init: function(points) {
			this.points = points;
		},
		
		pointsCount: function() {
			return this.points.length;
		},
		
		perimeter: function() {
			if (this.points.length < 2)
				return 0;
			
			var perimeter = 0;
			for (var i = 0; i < this.points.length; i++) {
				var first = this.points[i];
				var second = (i === this.points.length - 1) ? 
                                this.points[0] :
                                this.points[i + 1];

				var xsDiff = first.x - second.x;
				var ysDiff = first.y - second.y;
				perimeter += Math.sqrt(xsDiff * xsDiff + ysDiff * ysDiff);
			}
			return perimeter;
		},
	
		area: function() {
			if (this.points.length < 3)
				return 0;
			
			var area = 0;
			for (var i = 0; i < this.points.length - 1; i++) {
				var first = this.points[i];
				var second = this.points[i + 1];
				area += (first.x + second.x) * (first.y - second.y);
			}
			return area / 2;
		}
	});
	
	Polygon.parse = function(string) {
		var pointStrings = string.split(' ');
		var points = pointStrings.map(function(x) { return g.Point.parse(x); });
		return new Polygon(points);
	}
	
	var g = require('geometry');
	g.Point.parse = function(string) {
		var parts = string.split(',');
		var x = parseFloat(parts[0]);
		var y = parseFloat(parts[1]);
		return new g.Point(x, y);
	}
	
	exports.Polygon = Polygon;
})();