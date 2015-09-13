// app/routes/user.js

var User = require('../models/user');

module.exports = function(app) {
    //get all users
    app.get('/api/users', function(req, res) {
        User.find({
            _id: req.decoded._id
        }, function(err, user) {
            if (err) res.send(err); else res.json(user);
        });
    });

    // get a single user
    app.get('/api/users/:user_id', function(req, res) {
        if (req.params.user_id === req.decoded._id) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err); else res.json(user);
            });
        } else {
            res.json([]);
        }
    });

    // update a single user
    app.put('/api/users/:user_id', function(req, res) {
        if (req.params.user_id === req.decoded._id) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) {
                    res.send(err);
                } else {
                    user.name = req.body.name;

                    user.save(function(err, user) {
                        if (err) res.send(err); else res.json({ success: user});
                    });
                }
            });
        } else {
            res.status(403).send({success: false, message: "You are not authorized to update this user"});
        }
    });

    // delete a user
    app.delete('/api/users/:user_id', function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) res.send(err); else res.json({ success: 'User Deleted' });
        })
    });
};