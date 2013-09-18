var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var Class = require('./modules/oop').Class;

function printMongoCollection() {
  MongoClient.connect('mongodb://intelli-place:Asdf1234@ds041168.mongolab.com:41168/intelli-place', function (err, db) {
    if (err) throw err;

		var collection = db.collection('workspaces');
		  // Locate all the entries using find
		collection.findOne({'_id': 'miromiroslavov'}, function(err, result) {
			console.log(result);
			// Let's close the db
			db.close();		
		});
	});
    var collection = db.collection('workspaces');
    // Locate all the entries using find
    collection.findOne({'_id': 'miroslav.miroslavov@gmail.com'}, function (err, result) {
      console.log(result);
      // Let's close the db
      db.close();
    });
  });
		var collection = db.collection('workspaces');
        // Locate all the entries using find
		collection.findOne({'_id': 'miromiroslavov'}, function(err, result) {
			console.log(result);
			// Let's close the db
			db.close();		
		});
	});
}

exports.printMongoCollection = printMongoCollection

exports.getWorkspaces = function (callback) {
  MongoClient.connect('mongodb://intelli-place:Asdf1234@ds041168.mongolab.com:41168/intelli-place', function (err, db) {
    if (err) throw err;

    var collection = db.collection('workspaces');
    // Locate all the entries using find
    collection.find().toArray(function (err, items) {
      if (err) throw err;

      callback(items);
      // Let's close the db
      db.close();
    });
  });
}

var createWorkspace = function(json) {
	var result = new Object();
	result.name = json.name;
	result.offices = [];
	result.toString = function() {
		return result.name + ', []';
	}
	return result;
var createWorkspace = function (json) {
  var result = new Object();
  result.name = json.name;
  result.offices = [];
  result.toString = function () {
    return result.name + ', []';
  }
  return result;
var createWorkspace = function(json) {
	return Class.extend({
        name: json.name,
        offices: [],
        toString: function() {
            return this.name + ', []';
        }
	});
}

var workspace = {
  "_id": "miroslav.miroslavov@gmail.com",
  "name": "Sofia Valley",
  "offices": [
    {
      "name": "HQ1",
      "rooms": [
        {
          "name": "101",
          "boundary": "m0,0 L0,500 L500,500 L500,0z",
          "position": "100 100",
          "artifacts": [
            {
              "type": "air-conditioner",
              "position": "50 50",
              "boundary": "m0,0 L0,50 L50,50 L50,0z",
              "obstacle": false
            },
            {
              "type": "column",
              "position": "300 150",
              "boundary": "m0,0 L0,50 L50,50 L50,0z",
              "obstacle": true
            }
          ],
          "arrangements": [
            {
              "name": "plan1",
              "objects": [
                {
                  "type": "desk",
                  "name": "Miro's desk",
                  "position": "400 250",
                  "boundary": "m0,0 L0,50 L50,50 L50,0z"
                },
                {
                  "type": "chair",
                  "name": "Miro's chair",
                  "position": "412.5 300",
                  "boundary": "m0,0 L0,25 L25,25 L25,0z"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

var office = workspace.offices[0];

var room = office.rooms[0];

console.log(room);

var ext = require('./modules/geometryExtensions');
var g = require('geometry');
var p = new ext.Polygon([new g.Point(0, 0), new g.Point(0, 10), new g.Point(10, 10), new g.Point(10, 0)]);
console.log(p);
console.log(p.perimeter());
console.log(p.area());
console.log(g.Point.parse('10.5,20'));
console.log(ext.Polygon.parse('0,0 10,0 10,10 0,10').area());
// var parser = require('./svgPathGrammer').pathParser;

// var p = parser.parse('m0,0 L0,500 L500,500 L500,0z');
// console.dir(p);
