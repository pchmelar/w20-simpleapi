// grab the things we need
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

// create a schema
var orderSchema = new Schema({
	customer: Schema.ObjectId,
	items: Array
});
orderSchema.plugin(mongoosePaginate);

// the schema is useless so far
// we need to create a model using it
var Order = mongoose.model('order', orderSchema, 'order');

// make this available to our users in our Node applications
module.exports = Order;