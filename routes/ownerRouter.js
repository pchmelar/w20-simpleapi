module.exports = (function() {

    var router = require('express').Router();
    var Owner = require('../models/owner');

    router.get('/', function(req, res) {
        Owner.find({}, {'_id': false}, function(err, owners) {
            if (err) throw err;
            res.json(owners);
        });
    });

    return router;

})();