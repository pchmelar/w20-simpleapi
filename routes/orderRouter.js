module.exports = (function() {

    var mongoose = require('mongoose');
    var router = require('express').Router();
    var Order = require('../models/order');
    var baseUrl = process.env.PROD_URL || "http://localhost:8080";
    baseUrl = baseUrl + "/order/";

    router.get('/', function(req, res) {
        Order.paginate({}, { page: parseInt(req.query.page), limit: parseInt(req.query.limit) }, function(err, orders) {
            if (err) throw err;

            // construct response with HATEOAS
            var data = {};
            data.orders = []
            for (var i = 0; i < orders.docs.length; i++) {
                data.orders[i] = {};
                data.orders[i]._id = orders.docs[i]._id;
                data.orders[i].customer = orders.docs[i].customer;
                data.orders[i].items = orders.docs[i].items;
                data.orders[i]._links = [{ "href": baseUrl + data.orders[i]._id, "rel": "self" }];
                if (req.query.hasOwnProperty('apikey') && req.query.apikey == 'abc') {
                    data.orders[i]._links.push({ "href": baseUrl + data.orders[i]._id, "rel": "remove" });
                    data.orders[i]._links.push({ "href": baseUrl + data.orders[i]._id, "rel": "modify" });
                }
            }
            data._links = [{ "href": baseUrl.slice(0, -1) + "?page=1&limit=10", "rel": "list" }];
            if (req.query.hasOwnProperty('apikey') && req.query.apikey == 'abc') data._links.push({ "href": baseUrl.slice(0, -1), "rel": "add" });

            // construct pagination links
            var links = []
            links.push("<" + baseUrl + "?page=" + orders.page + "&limit=" + orders.limit + ' rel="self">');
            if (orders.page > 1) links.push("<" + baseUrl + "?page=" + (orders.page-1) + "&limit=" + orders.limit + ' rel="prev">');
            if (orders.page < orders.pages) links.push("<" + baseUrl + "?page=" + (orders.page+1) + "&limit=" + orders.limit + ' rel="next">');
            links.push("<" + baseUrl + "?page=1&limit=" + orders.limit + ' rel="first">');
            links.push("<" + baseUrl + "?page=" + orders.pages + "&limit=" + orders.limit + ' rel="last">');
            res.header('Link', links);

            res.json(data);

        });
    });

    router.get('/:id', function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Order.find({}).sort({ _id: 1 }).exec(function(err, orders) {
                if (err) throw err;

                var founded = false;
                for (var i = 0; i < orders.length; i++) {
                    if (orders[i]._id == req.params.id) {

                        // construct response with HATEOAS
                        var data = {};
                        data._id = orders[i]._id;
                        data.customer = orders[i].customer;
                        data.items = orders[i].items;
                        data._links = [{ "href": baseUrl + data._id, "rel": "self" }];
                        if (req.query.hasOwnProperty('apikey') && req.query.apikey == 'abc') {
                            data._links.push({ "href": baseUrl + data._id, "rel": "remove" });
                            data._links.push({ "href": baseUrl + data._id, "rel": "modify" });
                        }

                        // get prev and next
                        if (i != 0) data._links.push({ "href": baseUrl + orders[i - 1]._id, "rel": "prev" });
                        if (i != orders.length-1) data._links.push({ "href": baseUrl + orders[i + 1]._id, "rel": "next" });

                        founded = true;
                        res.json(data);

                    }
                }

                if (founded == false) {
                    res.statusCode = 404;
                    res.send('Error 404: Order with specified ID not found');
                }
            });

        } else {
            res.statusCode = 400;
            res.send('Error 400: Invalid ID');
        }
    });

    router.post('/', function(req, res) {

        // check apikey (naive implementation)
        if (req.query.hasOwnProperty('apikey') && req.query.apikey == 'abc') {

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
                newOrder.save(function(err, order) {
                    if (err) throw err;
                    res.statusCode = 201;

                    // construct response with HATEOAS
                    var data = {};
                    data._links = [{ "href": baseUrl + order._id, "rel": "self" }];
                    res.json(data);
                });
            }

        } else {
            res.statusCode = 403;
            res.send('Error 403: Invalid API key');
        }
    });

    router.put('/:id', function(req, res) {

        // check apikey (naive implementation)
        if (req.query.hasOwnProperty('apikey') && req.query.apikey == 'abc') {

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
                        order.save(function(err, order) {
                            if (err) throw err;

                            // construct response with HATEOAS
                            var data = {};
                            data._links = [{ "href": baseUrl + order._id, "rel": "self" }];
                            res.json(data);
                        });
                    }
                });
            } else {
                res.statusCode = 400;
                res.send('Error 400: Invalid ID');
            }

        } else {
            res.statusCode = 403;
            res.send('Error 403: Invalid API key');
        }
    });

    router.delete('/:id', function(req, res) {

        // check apikey (naive implementation)
        if (req.query.hasOwnProperty('apikey') && req.query.apikey == 'abc') {

            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                Order.findById(req.params.id, function(err, order) {
                    if (err) throw err;
                    if (order == null) {
                        res.statusCode = 404;
                        res.send('Error 404: Order with specified ID not found');
                    } else {
                        order.remove(function(err) {
                            if (err) throw err;

                            // construct response with HATEOAS
                            var data = {};
                            data._links = [{ "href": baseUrl.slice(0, -1) + "?page=1&limit=10", "rel": "list" }];
                            res.json(data);
                        });
                    }
                });
            } else {
                res.statusCode = 400;
                res.send('Error 400: Invalid ID');
            }

        } else {
            res.statusCode = 403;
            res.send('Error 403: Invalid API key');
        }
    });

    return router;

})();