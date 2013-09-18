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
		
		orientedArea: function() {
			if (this.points.length < 3)
				return 0;
			
			var area = 0;
			for (var i = 0; i < this.points.length; i++) {
				var first = this.points[i];
				if (i < this.points.length - 1) {
					var second = this.points[i + 1];
				} else {
					var second = this.points[0];
				}
				area += (first.x + second.x) * (first.y - second.y);
			}
			return area / 2;
		},
		
		area: function() {
			return Math.abs(this.orientedArea());
		}
	});
	
	Polygon._pointRegEx = /(?:-?(?:0|[1-9]+\d*)(?:\.\d+)?(?:,|\s|;)*){2}/g;	
	
	Polygon.parse = function(string) {		
		var pointMatches = string.match(Polygon._pointRegEx);
		var points = pointMatches.map(function(x) { return g.Point.parse(x); });
		return new Polygon(points);
	}
	
	var g = require('geometry');
	g.Point.parse = function(string) {
		var parts = string.replace(', ', ' ').replace(',', ' ').split(' ');
		var x = parseFloat(parts[0]);
		var y = parseFloat(parts[1]);
		return new g.Point(x, y);
	}
	
	exports.Polygon = Polygon;
})();