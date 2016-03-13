// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ownerSchema = new Schema({
	name: String,
	surname: String,
	age: Number,
	places: Array
});

// the schema is useless so far
// we need to create a model using it
var Owner = mongoose.model('owner', ownerSchema, 'owner');

// make this available to our users in our Node applications
module.exports = Owner;