module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Customer = require('../models/customer');

    var crypto = require("crypto");

    function computeWeakETag(customers) {
        var content = "";
        for (var i = 0; i < customers.length; i++)
            content += customers[i].id + customers[i].name;
        return crypto.createHash('md5').update(content).digest("hex");
    }

    router.get('/', function(req, res) {
        Customer.find({}, { 'toDelete': false }, { sort: '-updatedAt' }, function(err, customers) {
            if (err) throw err;
            res.header('Cache-Control', 'private, no-store, max-age=300');
            res.header('Last-Modified', customers[0].updatedAt);
            res.header('ETag', computeWeakETag(customers));
            res.json(customers);
        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Customer.findById(req.params.id, { 'toDelete': false }, function(err, customer) {
                if (err) throw err;
                if (customer == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Customer with specified ID not found');
                } else res.json(customer);
            });
        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    router.post('/', function(req, res) {

        if (!req.body.hasOwnProperty('name') ||
            !req.body.hasOwnProperty('orders')) {
            res.statusCode = 400;
            res.send('Error 400: Post syntax incorrect.');
        } else {
            // create a new object
            var newCustomer = Customer({
                name: req.body.name,
                orders: req.body.orders,
                toDelete: false
            });

            // save the object
            newCustomer.save(function(err) {
                if (err) throw err;
                res.statusCode = 201;
                res.json(true);
            });
        }
    });

    router.put('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Customer.findById(req.params.id, function(err, customer) {
                if (err) throw err;
                if (customer == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Customer with specified ID not found');
                } else {

                    // update the object
                    if (req.body.hasOwnProperty('name')) customer.name = req.body.name;
                    if (req.body.hasOwnProperty('orders')) customer.orders = req.body.orders;

                    // save the object
                    customer.save(function(err) {
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

    // asynchronous delete (requires confirmation)
    router.delete('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Customer.findById(req.params.id, function(err, customer) {
                if (err) throw err;
                if (customer == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Customer with specified ID not found');
                } else {

                    // marked for deletion
                    customer.toDelete = true;
                    customer.save(function(err) {
                        if (err) throw err;
                        res.statusCode = 202;
                        res.json(true);
                    });
                }
            });
        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    router.delete('/:id/confirm', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Customer.findById(req.params.id, function(err, customer) {
                if (err) throw err;
                if (customer == null) {
                    res.statusCode = 404;
                    res.send('Error 404: Customer with specified ID not found');
                } else {
                    if (customer.toDelete == false) {
                        res.statusCode = 400;
                        res.send('Error 400: Customer with specified ID not marked for deletion');
                    } else {
                        customer.remove(function(err) {
                            if (err) throw err;
                            res.json(true);
                        });
                    }
                }
            });
        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    return router;

})();