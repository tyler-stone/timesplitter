// app/routes/auth.js

var User	  = require('../models/user');

// Helper libraries
var async     = require('async');
var bcrypt    = require('bcrypt');
var jwt       = require('jsonwebtoken');

module.exports = function(app) {

	app.post('/api/authenticate', function(req, res) {
		User.findOne({
			email: req.body.email
		}, function(err, user) {
			if (err) throw err;
			console.log(req.body);
			if (!user) {
				res.json({ success: false, message: "Authentication failed. User not found."});
			} else if (user) {
			    var correct = bcrypt.compareSync(req.body.password, user.password);
			    if (correct) {
			    	var token = jwt.sign(user, app.get('secret'), {
			          expiresInMinutes: 1440 // expires in 24 hours
			        });
			    	
			    	res.json({
			    		success: true,
			    		token: token
			    	});
			    } else {
			    	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			    }
			}
		})
	});

	// create a user
    app.post('/api/users', function(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        var user = new User(req.body);

        user.save(function(err, user) {
            if (err) res.send(err); else res.json({ success: user});
        });
    });
};
