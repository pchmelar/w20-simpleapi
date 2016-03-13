// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var placeSchema = new Schema({
    street: String,
    number: Number,
    city: String,
    postalCode: String,
    country: String
});

// the schema is useless so far
// we need to create a model using it
var Place = mongoose.model('place', placeSchema, 'place');

// make this available to our users in our Node applications
module.exports = Place;