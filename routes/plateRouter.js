module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Plate = require('../models/plate');

    router.get('/', function(req, res) {
        Plate.find({}, function(err, plates) {
            if (err) throw err;
            res.json(plates);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Plate.findById(req.params.id, function(err, plate) {
                if (err) throw err;
                if (plate == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Plate with specified ID not found');
                } else res.json(plate);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    router.post('/', function(req, res) {

        if (!req.body.hasOwnProperty('plate')) {
            res.statusCode = 400;
            res.send('Error 400: Post syntax incorrect.');
        }

        // create a new object
        var newPlate = Plate({
            plate: req.body.plate
        });

        // save the object
        newPlate.save(function(err) {
            if (err) throw err;
            res.json(true);
        });
    });

    router.put('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Plate.findById(req.params.id, function(err, plate) {
                if (err) throw err;
                if (plate == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Plate with specified ID not found');
                } else {

                    // update the object
                    if (req.body.hasOwnProperty('plate')) plate.plate = req.body.plate;

                    // save the object
                    plate.save(function(err) {
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
            Plate.findByIdAndRemove(req.params.id, function(err) {
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