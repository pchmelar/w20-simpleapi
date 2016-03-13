module.exports = (function() {

    var router = require('express').Router();
    var Car = require('../models/car');

    router.get('/', function(req, res) {
        Car.find({}, {'_id': false}, function(err, cars) {
            if (err) throw err;
            res.json(cars);
        });
    });

    return router;

})();