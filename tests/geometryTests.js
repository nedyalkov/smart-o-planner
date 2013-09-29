QUnit.module("Point.parse");

test("Parse point with comma.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1,2");
	
    deepEqual(parsed, new g.Point(1, 2))
});

test("Parse point with space.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1 2");
	
    deepEqual(parsed, new g.Point(1, 2))
});

test("Parse point with space and comma.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1, 2");
	
    deepEqual(parsed, new g.Point(1, 2))
});

test("Parse point with space and comma.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1, 2");
	
    deepEqual(parsed, new g.Point(1, 2))
});

QUnit.module("Polygon.parse");

test("Single point.", function() {
	var g = require('geometry');
	
	var parsed = Polygon.parse("1,2");
    deepEqual(parsed, new Polygon([new g.Point(1, 2)]))
});

test("Multiple points.", function() {
	var g = require('geometry');
	
	var parsed = Polygon.parse("1,2 10,10 0,0");
    deepEqual(parsed, new Polygon([new g.Point(1, 2), new g.Point(10, 10), new g.Point(0, 0)]))
});

test("Multiple points with brackets.", function() {
	var g = require('geometry');
	
	var parsed = Polygon.parse("(1 2) (10 10) (0 0)");
    deepEqual(parsed, new Polygon([new g.Point(1, 2), new g.Point(10, 10), new g.Point(0, 0)]))
});

test("Multiple points with svg syntax.", function() {
	var g = require('geometry');
	
	var parsed = Polygon.parse("m0,0 L0,50 L50,50 L50,0z");
    deepEqual(parsed, new Polygon([new g.Point(0, 0), new g.Point(0, 50), new g.Point(50, 50), new g.Point(50, 0)]))
});

QUnit.module("Polygon.area");

test("Calculate area - sqare.", function() {
	var poly = Polygon.parse("0,0 10,0 10,10 0,10");
	equal(poly.area(), 100);
});

test("Calculate area - triangle.", function() {
	var poly = Polygon.parse("0,0 10,0 5,5");
	equal(poly.area(), 25);
});

test("Calculate area - irregular hexagon.", function() {
	var poly = Polygon.parse("(0,1) (5,-4) (8,-2) (10,4) (5,5) (2,4)");
	equal(poly.area(), 55.5);
});

QUnit.module("Trapezoid.infer");
test("", function() {
    var Point = require('geometry').Point;
    var trapezoid = new Trapezoid(new Point(10, 10), new Point(20, 10), 5, Math.PI/4);
    deepEqual(trapezoid.p3, new Point(5, 15));
    deepEqual(trapezoid.p4, new Point(25, 15));

});