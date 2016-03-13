module.exports = (function() {

    var router = require('express').Router();
    var Plate = require('../models/plate');

    router.get('/', function(req, res) {
        Plate.find({}, {'_id': false}, function(err, plates) {
            if (err) throw err;
            res.json(plates);
        });
    });

    return router;

})();