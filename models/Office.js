var mongoose = require('mongoose'),
  Room = require('../models/room');

OfficeSchema = mongoose.Schema({
    name: String,
    offices: [Room.Room]
});

var Office = mongoose.model("Office", OfficeSchema);
module.exports = Office;