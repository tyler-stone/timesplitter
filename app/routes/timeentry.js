// app/routes/timeentry.js

// Helper libraries
var async     = require('async');

// Modals
var TimeEntry   = require('../models/timeentry');
var Category  = require('../models/category');

module.exports = function(app) {
    //get all timeentries
    app.get('/api/timeentries', function(req, res) {
        var params = {
            userId: req.decoded._id 
        };

        if (req.query.day) {
            var d = new Date(req.query.day);
            var begin = new Date(d.toDateString());
            var end = new Date(d.toDateString());
            end.setDate(end.getDate() + 1);

            params.date = {
                "$gte" : begin,
                "$lt" : end
            };
        }

        TimeEntry.find(params).populate('category').exec(function(err, timeentries) {
            if (err) res.send(err); else res.json(timeentries);
        });
    });

    // get a single timeentry
    app.get('/api/timeentries/:timeentry_id', function(req, res) {
        TimeEntry.find({
    	    _id: req.params.timeentry_id,
    	    userId: req.decoded._id
    	}).populate('category').exec(function(err, timeentry) {
            if (err) res.send(err); else res.json(timeentry);
        });
    });

    // update a single timeentry
    app.put('/api/timeentries/:timeentry_id', function(req, res) {
        TimeEntry.find({
    	    _id: req.params.timeentry_id, 
    	    userId: req.decoded._id
    	}, function(err, timeentry) {
            if (err) {
                res.send(err);
            } else {
                timeentry.name = req.body.name;
                timeentry.hours = req.body.hours;
                timeentry.category = req.body.category;
                timeentry.userId = req.decoded._id;

                timeentry.save(function(err, timeentry) {
                    if (err) res.send(err); else res.json({ success: timeentry });
                });
            }
        });
    });

    // create a timeentry
    app.post('/api/timeentries', function(req, res) {
        var timeentry = new TimeEntry(req.body);
        timeentry.userId = req.decoded._id;

        timeentry.save(function(err, timeentry) {
            if (err) res.send(err); else res.json({success: timeentry });
        });
    });

    // delete a timeentry
    app.delete('/api/timeentries/:timeentry_id', function(req, res) {
        TimeEntry.remove({
            _id: req.params.timeentry_id,
	       userId: req.decoded._id
        }, function(err, timeentry) {
            if (err) res.send(err); else res.json({ success: 'TimeEntry Deleted' });
        });
    });
};
