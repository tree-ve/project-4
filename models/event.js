const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);