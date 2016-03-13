// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var plateSchema = new Schema({
	plate: String
});

// the schema is useless so far
// we need to create a model using it
var Plate = mongoose.model('plate', plateSchema, 'plate');

// make this available to our users in our Node applications
module.exports = Plate;