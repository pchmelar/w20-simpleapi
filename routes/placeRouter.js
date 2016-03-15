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
                    res.send('Error 404: No place found');
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