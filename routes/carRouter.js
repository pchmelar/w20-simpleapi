module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Car = require('../models/car');

    router.get('/', function(req, res) {

        //query by string
        if (req.query.hasOwnProperty('brand')) {
            Car.find({ brand: req.query.brand }, function(err, cars) {
                if (err) throw err;
                res.json(cars);
            });
        } else if (req.query.hasOwnProperty('model')) {
            Car.find({ model: req.query.model }, function(err, cars) {
                if (err) throw err;
                res.json(cars);
            });
        } else if (req.query.hasOwnProperty('year')) {
            Car.find({ year: req.query.year }, function(err, cars) {
                if (err) throw err;
                res.json(cars);
            });
        } else {
            Car.find({}, function(err, cars) {
                if (err) throw err;
                res.json(cars);
            });
        }

    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Car.findById(req.params.id, function(err, car) {
                if (err) throw err;
                if (car == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Car with specified ID not found');
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
        } else {
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
                res.statusCode = 201;
                res.json(true);
            });
        }
    });

    router.put('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Car.findById(req.params.id, function(err, car) {
                if (err) throw err;
                if (car == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Car with specified ID not found');
                } else {

                    // update the object
                    if (req.body.hasOwnProperty('brand')) car.brand = req.body.brand;
                    if (req.body.hasOwnProperty('model')) car.model = req.body.model;
                    if (req.body.hasOwnProperty('year')) car.year = req.body.year;
                    if (req.body.hasOwnProperty('ownerId')) car.ownerId = req.body.ownerId;
                    if (req.body.hasOwnProperty('plateId')) car.plateId = req.body.plateId;

                    // save the object
                    car.save(function(err) {
                        if (err) throw err;
                        res.json(true);
                    });
                }
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
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