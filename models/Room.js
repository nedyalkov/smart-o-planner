var mongoose = require('mongoose');

RoomSchema = mongoose.Schema({
  name: String
});

var Room = mongoose.model("Room", RoomSchema);
module.exports = Room;