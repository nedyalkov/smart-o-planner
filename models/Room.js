var mongoose = require('mongoose');

RoomSchema = mongoose.Schema({
  name: String //,
  // boundary: String,
  // artifacts: ???,
  // arrangements: ???
});

var Room = mongoose.model("Room", RoomSchema);
module.exports = Room;