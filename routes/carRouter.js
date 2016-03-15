module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Car = require('../models/car');

    router.get('/', function(req, res) {
        Car.find({}, function(err, cars) {
            if (err) throw err;
            res.json(cars);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Car.findById(req.params.id, function(err, car) {
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

    router.post('/', function(req, res) {

        if (!req.body.hasOwnProperty('brand') ||
            !req.body.hasOwnProperty('model') ||
            !req.body.hasOwnProperty('year') ||
            !req.body.hasOwnProperty('ownerId') ||
            !req.body.hasOwnProperty('plateId')) {
            res.statusCode = 400;
            res.send('Error 400: Post syntax incorrect.');
        }

        // create a new object
        var newCar = Car({
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            ownerId: req.body.ownerId,
            plateId: req.body.plateId
        });

        // save the object
        newCar.save(function(err) {
            if (err) throw err;
            res.json(true);
        });
    });

    router.delete('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Car.findByIdAndRemove(req.params.id, function(err) {
                if (err) throw err;
                res.json(true);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    return router;

})();