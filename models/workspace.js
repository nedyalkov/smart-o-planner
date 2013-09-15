var mongoose = require('mongoose'),
  Office = require('../models/office');

WorkspaceSchema = mongoose.Schema({
  _id: String,
  name: String,
  offices: [Office.Office]
});

WorkspaceSchema.statics.find = function (email, callback) {
  this.findOne({_id: email}, function (err, workspace) {
    if (!err) {
      callback(workspace);
    }
  });
};

var Workspace = mongoose.model("Workspace", WorkspaceSchema);
module.exports = Workspace;