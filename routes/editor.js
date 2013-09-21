var room = require('../models/room');
var url = require('url');
/*
 * GET the room editor.
 */

exports.editor = function (req, res) {
  if (req.isAuthenticated()) {
    var queryObject = url.parse(req.url, true).query;
    var office = queryObject.office;
    var room = queryObject.room;
    var workspace = req.session.workspace;
    var o = workspace.offices.filter(function (o) {
      return o.name == office;
    })[0];
    var r = o.rooms.filter(function (r) {
      return r.name == room;
    })[0];
    res.render("editor", { user: req.user, title: 'Intelli Place Editor', office: office, roomName: r.name, room: JSON.stringify(r) });
  } else {
    res.render("login");
  }
};