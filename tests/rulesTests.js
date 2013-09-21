//var ConcentrationRule = require('./rules').ConcentrationRule;
var Polygon = require('../modules/geometryExtensions').Polygon;

QUnit.module("ConcentrationRule");

test("Empty room with default rating function and concentration 500 with min 250 and max 750 should return 0.5", function() {
	var roomBoundary = Polygon.parse('m0,0 L0,50 L50,50 L50,0z'); // area = 50 * 50 = 2500
	var roomArtifacts = []; // area = 0
	var arrangementObjects = [{}, {}, {}, {}, {}]; // 500 each
	var rule = new ConcentrationRule(250, 750);
	var resultRate = rule.rate(roomBoundary, roomArtifacts, arrangementObjects);
	deepEqual(resultRate, 0.5);
});

test("Empty room with default rating function and concentration 300 with min 250 and max 750 should return 0.1", function() {
	var roomBoundary = Polygon.parse('m0,0 L0,50 L30,50 L30,0z'); // area = 30 * 50 = 1500
	var roomArtifacts = []; // area = 0
	var arrangementObjects = [{}, {}, {}, {}, {}]; // 300 each
	var rule = new ConcentrationRule(250, 750);
	var resultRate = rule.rate(roomBoundary, roomArtifacts, arrangementObjects);
	deepEqual(resultRate, 0.1);
});

test("Empty room with quadratic rating function and concentration 500 with min 250 and max 750 should return 1", function() {
	var roomBoundary = Polygon.parse('m0,0 L0,50 L50,50 L50,0z'); // area = 50 * 50 = 2500
	var roomArtifacts = []; // area = 0
	var arrangementObjects = [{}, {}, {}, {}, {}]; // 500 each
	var rule = new ConcentrationRule(250, 750);
	rule.ratingFunction = quadraticFunction;
	var resultRate = rule.rate(roomBoundary, roomArtifacts, arrangementObjects);
	deepEqual(resultRate, 1);
});

test("Empty room with quadratic rating function and concentration 625 with min 250 and max 750 should return 0.75", function() {
	var roomBoundary = Polygon.parse('m0,0 L0,50 L50,50 L50,0z'); // area = 50 * 50 = 2500
	var roomArtifacts = []; // area = 0
	var arrangementObjects = [{}, {}, {}, {}]; // 625 each
	var rule = new ConcentrationRule(250, 750);
	rule.ratingFunction = quadraticFunction;
	var resultRate = rule.rate(roomBoundary, roomArtifacts, arrangementObjects);
	deepEqual(resultRate, 0.75);
});

test("Room with artifacts (100) and default rating function and concentration 500 with min 400 and max 800 should return 0.5", function() {
	var roomBoundary = Polygon.parse('m0,0 L0,50 L50,50 L50,0z'); // area = 50 * 50 = 2500
	var roomArtifacts = [{ boundary: Polygon.parse('m0,0 L0,10 L10,10 L10,0z') }]; // area = 100
	var arrangementObjects = [{}, {}, {}, {}]; // 600 each
	var rule = new ConcentrationRule(400, 800);
	var resultRate = rule.rate(roomBoundary, roomArtifacts, arrangementObjects);
	deepEqual(resultRate, 0.5);
});

QUnit.module("SunlightRule");
test("", function() {
	var roomBoundary = Polygon.parse('m0,0 L0,50 L50,50 L50,0z'); // area = 50 * 50 = 2500
	var roomArtifacts = [{ boundary: Polygon.parse('m0,0 L0,10 L10,10 L10,0z') }]; // area = 100
	var arrangementObjects = [{}, {}, {}, {}]; // 600 each
	var rule = new ConcentrationRule(400, 800);
	var resultRate = rule.rate(roomBoundary, roomArtifacts, arrangementObjects);
	deepEqual(resultRate, 0.5);
});