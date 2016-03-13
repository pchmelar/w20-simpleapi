module.exports = (function() {

	var mongoose = require('mongoose');
    var router = require('express').Router();
    var Car = require('../models/car');

    router.get('/', function(req, res) {
        Car.find({}, { '_id': false }, function(err, cars) {
            if (err) throw err;
            res.json(cars);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Car.findById(req.params.id, { '_id': false }, function(err, car) {
                if (err) throw err;
                if (car == null) {
                    res.statusCode = 404;
                    res.send('Error 404: No car found');
                } else res.json(car);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    return router;

})();