// express
var express = require('express');
var app = express();
app.set('json spaces', 4);

// bodyParser
var bodyParser = require('body-parser')
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));

// mongoDB
var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/w20');

// routes
var place = require('./routes/placeRouter');
var owner = require('./routes/ownerRouter');
var car = require('./routes/carRouter');
var plate = require('./routes/plateRouter');
var customer = require('./routes/customerRouter');
var order = require('./routers/orderRouter');
app.use('/place', place);
app.use('/owner', owner);
app.use('/car', car);
app.use('/plate', plate);
app.use('/customer', customer);
app.use('/order', order);

app.get('/', function(req, res) {
    res.type('text/plain'); // set content-type
    res.send('Simple API for W20 homeworks'); // send text response
});

app.listen(process.env.PORT || 8080);