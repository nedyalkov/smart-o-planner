var models = require('../models')

exports.list = function(req, res){
	models.getWorkspaces(function(items) {
		items.forEach(function(item) {
			res.write(item.name);
		});
		res.write("Spas");
		res.end();
  });
};

exports.get = function(req, res) {
	res.send("Workspace " + req.params.name + " comes here...");
}