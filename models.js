var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

function printMongoCollection() {
	MongoClient.connect('mongodb://intelli-place:Asdf1234@ds041168.mongolab.com:41168/intelli-place', function(err, db) {
		if(err) throw err;

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

exports.getWorkspaces = function(callback) {
	MongoClient.connect('mongodb://intelli-place:Asdf1234@ds041168.mongolab.com:41168/intelli-place', function(err, db) {
		if(err) throw err;

		var collection = db.collection('workspaces');
		// Locate all the entries using find
		collection.find().toArray(function(err, items) {
			if(err) throw err;
		
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
}

var workspace = {
    "_id": "miromiroslavov",
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

var parser = require('./svgPathGrammer').pathParser;

var p = parser.parse('m0,0 L0,500 L500,500 L500,0z');
console.dir(p);













