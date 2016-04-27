var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    uid: String,
    note: String,
    logs : { type : Array , "default" : [] },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', schema);