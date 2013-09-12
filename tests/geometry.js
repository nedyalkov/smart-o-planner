test("Parse point with comma.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1,2");
	
    deepEqual(new g.Point(1, 2), parsed)
});

test("Parse point with space.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1 2");
	
    deepEqual(new g.Point(1, 2), parsed)
});

test("Parse point with space and comma.", function() {
	var g = require('geometry');
	
	var parsed = g.Point.parse("1, 2");
	
    deepEqual(new g.Point(1, 2), parsed)
});