var models = require('../models'),
  workspace = require('../models/workspace');

exports.list = function (req, res) {
  models.getWorkspaces(function (items) {
    items.forEach(function (item) {
      res.write(item.name);
    });
    res.write("Spas");
    res.end();
  });
};

exports.get = function (req, res) {
  res.send("Workspace " + req.params.name + " comes here...");
}

exports.workspace = function (req, res) {
  if (req.isAuthenticated()) {
    workspace.find(req.params.name, function (workspace) {
      res.send(workspace);
    })
  }
}