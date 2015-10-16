// app/routes/category.js

var Category = require('../models/category');

module.exports = function(app) {
    //get all categories
    app.get('/api/categories', function(req, res) {
        Category.find({
	    userId: req.decoded._id
	}, function(err, categories) {
            if (err) res.send(err); else res.json(categories);
        });
    });

    // get a single category
    app.get('/api/categories/:category_id', function(req, res) {    
	Category.find({
	    _id: req.params.category_id,
	    userId: req.decoded._id
	}, function(err, category) {
            if (err) res.send(err); else res.json(category);
        });
    });

    // update a single category
    app.put('/api/categories/:category_id', function(req, res) {
        Category.find({
	    _id: req.params.category_id,
	    userId: req.decoded._id
	},  function(err, category) {
            if (err) {
                res.send(err);
            } else {
                category.name = req.body.name;
                category.color = req.body.color;
                category.userId = req.decoded._id;

                category.save(function(err, category) {
                    if (err) res.send(err); else res.json({ success: category });
                });
            }
        });
    });

    // create a category
    app.post('/api/categories', function(req, res) {
        var category = new Category(req.body);
        category.userId = req.decoded._id;

        category.save(function(err, category) {
            if (err) res.send(err); else res.json({ success: category});
        });
    });

    // delete a category
    app.delete('/api/categories/:category_id', function(req, res) {
        Category.remove({
            _id: req.params.category_id,
	    userId: req.decoded._id
        }, function(err, category) {
            if (err) res.send(err); else res.json({ success: 'Category Deleted' });
        })
    });
};
