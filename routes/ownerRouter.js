module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Owner = require('../models/owner');

    router.get('/', function(req, res) {
        Owner.find({}, function(err, owners) {
            if (err) throw err;
            res.json(owners);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Owner.findById(req.params.id, function(err, owner) {
                if (err) throw err;
                if (owner == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Owner with specified ID not found');
                } else res.json(owner);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    router.post('/', function(req, res) {

        if (!req.body.hasOwnProperty('name') ||
            !req.body.hasOwnProperty('surname') ||
            !req.body.hasOwnProperty('age') ||
            !req.body.hasOwnProperty('places')) {
            res.statusCode = 400;
            res.send('Error 400: Post syntax incorrect.');
        } else {
            // create a new object
            var newOwner = Owner({
                name: req.body.name,
                surname: req.body.surname,
                age: req.body.age,
                places: req.body.places
            });

            // save the object
            newOwner.save(function(err) {
                if (err) throw err;
                res.statusCode = 201;
                res.json(true);
            });
        }
    });

    router.put('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Owner.findById(req.params.id, function(err, owner) {
                if (err) throw err;
                if (owner == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Owner with specified ID not found');
                } else {

                    // update the object
                    if (req.body.hasOwnProperty('name')) owner.name = req.body.name;
                    if (req.body.hasOwnProperty('surname')) owner.surname = req.body.surname;
                    if (req.body.hasOwnProperty('age')) owner.age = req.body.age;
                    if (req.body.hasOwnProperty('places')) owner.places = req.body.places;

                    // save the object
                    owner.save(function(err) {
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
            Owner.findByIdAndRemove(req.params.id, function(err) {
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