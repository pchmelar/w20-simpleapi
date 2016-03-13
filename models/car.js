// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var carSchema = new Schema({
	brand: String,
	model: String,
	year: Number,
	ownerId: Schema.ObjectId,
	plateId: Schema.ObjectId 
});

// the schema is useless so far
// we need to create a model using it
var Car = mongoose.model('car', carSchema, 'car');

// make this available to our users in our Node applications
module.exports = Car;