var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/w20');

var quote = require('./routes/quoteRouter');
var place = require('./routes/placeRouter');
var owner = require('./routes/ownerRouter');
var car = require('./routes/carRouter');
var plate = require('./routes/plateRouter');

app.use('/quote', quote);
app.use('/place', place);
app.use('/owner', owner);
app.use('/car', car);
app.use('/plate', plate);

app.get('/', function(req, res) {
    res.type('text/plain'); // set content-type
    res.send('Simple API for W20 homeworks'); // send text response
});

app.listen(process.env.PORT || 8080);