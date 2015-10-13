// app/routes/category.js

var Category = require('../models/category');

module.exports = function(app) {
    //get all categories
    app.get('/api/categories', function(req, res) {
        Category.find(function(err, categories) {
            if (err) res.send(err); else res.json(categories);
        });
    });

    // get a single category
    app.get('/api/categories/:category_id', function(req, res) {
        Category.findById(req.params.category_id, function(err, category) {
            if (err) res.send(err); else res.json(category);
        });
    });

    // update a single category
    app.put('/api/categories/:category_id', function(req, res) {
        Category.findById(req.params.category_id, function(err, category) {
            if (err) {
                res.send(err);
            } else {
                category.name = req.body.name;
                category.color = req.body.color;

                category.save(function(err, category) {
                    if (err) res.send(err); else res.json({ success: category});
                });
            }
        });
    });

    // create a category
    app.post('/api/categories', function(req, res) {
        var category = new Category(req.body);

        category.save(function(err, category) {
            if (err) res.send(err); else res.json({ success: category});
        });
    });

    // delete a category
    app.delete('/api/categories/:category_id', function(req, res) {
        Category.remove({
            _id: req.params.category_id
        }, function(err, category) {
            if (err) res.send(err); else res.json({ success: 'Category Deleted' });
        })
    });
};