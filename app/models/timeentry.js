var mongoose = require('mongoose');

// timeentry model
module.exports = mongoose.model('TimeEntry', {
    name : { type : String, required : true },
    date : Date,
    hours : Number,
    category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});