const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    body: {type: String, required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);