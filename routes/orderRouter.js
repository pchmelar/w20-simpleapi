module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Order = require('../models/order');

    router.get('/', function(req, res) {
        Order.find({}, function(err, orders) {
            if (err) throw err;
            res.json(orders);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Order.findById(req.params.id, function(err, order) {
                if (err) throw err;
                if (order == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Order with specified ID not found');
                } else res.json(order);
            });
        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    router.post('/', function(req, res) {

        if (!req.body.hasOwnProperty('customer') ||
            !req.body.hasOwnProperty('items')) {
            res.statusCode = 400;
            res.send('Error 400: Post syntax incorrect.');
        } else {
            // create a new object
            var newOrder = Order({
                customer: req.body.customer,
                items: req.body.items
            });

            // save the object
            newOrder.save(function(err) {
                if (err) throw err;
                res.statusCode = 201;
                res.json(true);
            });
        }
    });

    router.put('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Order.findById(req.params.id, function(err, order) {
                if (err) throw err;
                if (order == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Order with specified ID not found');
                } else {

                    // update the object
                    if (req.body.hasOwnProperty('customer')) order.customer = req.body.customer;
                    if (req.body.hasOwnProperty('items')) order.items = req.body.items;

                    // save the object
                    order.save(function(err) {
                        if (err) throw err;
                        res.json(true);
                    });
                }
            });
        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    router.delete('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Order.findById(req.params.id, function(err, order) {
                if (err) throw err;
                if (order == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Order with specified ID not found');
                } else {
                    order.remove(function(err) {
                        if (err) throw err;
                        res.json(true);
                    });
                }
            });
        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    return router;

})();