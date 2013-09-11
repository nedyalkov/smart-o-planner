(function() {
	var Class = {
		extend: function(proto) {
			var base = function() {},
				member,
				that = this,
				subclass = proto && proto.init ? proto.init : function () {
					that.apply(this, arguments);
				},
				fn;

			base.prototype = that.prototype;
			fn = subclass.fn = subclass.prototype = new base();

			for (member in proto) {
				if (typeof proto[member] === Object && !(proto[member] instanceof Array) && proto[member] !== null) {
					// Merge object members
					fn[member] = extend(true, {}, base.prototype[member], proto[member]);
				} else {
					fn[member] = proto[member];
				}
			}

			fn.constructor = subclass;
			subclass.extend = that.extend;

			return subclass;
		}
	};

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
			
			perimeter = 0;
			for (i = 0; i < this.points.length; i++) {
				var first = this.points[i];
				if (i === this.points.length - 1)
					var second = this.points[0];
				else
					var second = this.points[i + 1];
				var xsDiff = first.x - second.x;
				var ysDiff = first.y - second.y;
				perimeter += Math.sqrt(xsDiff * xsDiff + ysDiff * ysDiff);
			}
			return perimeter;
		},
	
		area: function() {
			if (this.points.length < 3)
				return 0;
			
			area = 0;
			for (i = 0; i < this.points.length - 1; i++) {
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