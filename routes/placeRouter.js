module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Place = require('../models/place');

    router.get('/', function(req, res) {
        Place.find({}, function(err, places) {
            if (err) throw err;
            res.json(places);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Place.findById(req.params.id, function(err, place) {
                if (err) throw err;
                if (place == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Place with specified ID not found');
                } else res.json(place);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    router.post('/', function(req, res) {

        if (!req.body.hasOwnProperty('street') ||
            !req.body.hasOwnProperty('number') ||
            !req.body.hasOwnProperty('city') ||
            !req.body.hasOwnProperty('postalCode') ||
            !req.body.hasOwnProperty('country')) {
            res.statusCode = 400;
            res.send('Error 400: Post syntax incorrect.');
        }

        // create a new object
        var newPlace = Place({
            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country
        });

        // save the object
        newPlace.save(function(err) {
            if (err) throw err;
            res.json(true);
        });
    });

    router.put('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Place.findById(req.params.id, function(err, place) {
                if (err) throw err;
                if (place == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Place with specified ID not found');
                } else {

                    // update the object
                    if (req.body.hasOwnProperty('street')) place.street = req.body.street;
                    if (req.body.hasOwnProperty('number')) place.number = req.body.number;
                    if (req.body.hasOwnProperty('city')) place.city = req.body.city;
                    if (req.body.hasOwnProperty('postalCode')) place.postalCode = req.body.postalCode;
                    if (req.body.hasOwnProperty('country')) place.country = req.body.country;

                    // save the object
                    place.save(function(err) {
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
            Place.findByIdAndRemove(req.params.id, function(err) {
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