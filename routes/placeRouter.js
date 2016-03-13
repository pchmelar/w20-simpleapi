module.exports = (function() {

    var router = require('express').Router();
    var Place = require('../models/place');

    router.get('/', function(req, res) {
        Place.find({}, {'_id': false}, function(err, places) {
            if (err) throw err;
            res.json(places);
        });
    });

    return router;

})();