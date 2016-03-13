module.exports = (function() {

	var mongoose = require('mongoose');
    var router = require('express').Router();
    var Plate = require('../models/plate');

    router.get('/', function(req, res) {
        Plate.find({}, { '_id': false }, function(err, plates) {
            if (err) throw err;
            res.json(plates);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Plate.findById(req.params.id, { '_id': false }, function(err, plate) {
                if (err) throw err;
                if (plate == null) {
                    res.statusCode = 404;
                    res.send('Error 404: No plate found');
                } else res.json(plate);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    return router;

})();