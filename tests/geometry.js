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