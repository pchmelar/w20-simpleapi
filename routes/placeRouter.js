module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Place = require('../models/place');

    router.get('/', function(req, res) {
        Place.find({}, { '_id': false }, function(err, places) {
            if (err) throw err;
            res.json(places);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Place.findById(req.params.id, { '_id': false }, function(err, place) {
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

    return router;

})();