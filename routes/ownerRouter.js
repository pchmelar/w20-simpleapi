module.exports = (function() {

	var mongoose = require('mongoose');
    var router = require('express').Router();
    var Owner = require('../models/owner');

    router.get('/', function(req, res) {
        Owner.find({}, { '_id': false }, function(err, owners) {
            if (err) throw err;
            res.json(owners);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Owner.findById(req.params.id, { '_id': false }, function(err, owner) {
                if (err) throw err;
                if (owner == null) {
                    res.statusCode = 404;
                    res.send('Error 404: No owner found');
                } else res.json(owner);
            });
        } else {
            res.statusCode = 404;
            res.send('Error 404: Invalid ID');
        }
    });

    return router;

})();