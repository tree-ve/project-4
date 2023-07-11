const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    title: {type: String, required: true},
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);