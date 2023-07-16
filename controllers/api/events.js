// const jwt = require('jsonwebtoken');
const Event = require('../../models/event')
// const User = require('../../models/user');
// const bcrypt = require('bcrypt');

module.exports = {
    create,
    index,
    // show,
    delete: deleteEvent,
    update
    // new: newEvent
};
    
async function create(req, res) {
    console.log('controllers/api/events/create')
    try {
        console.log('controllers/api/events/create', req.body)
        const event = await Event.create(req.body);
        console.log(event)
        return res.json(event);
    } catch (err) {
        console.log('controllers/api/events/create: error')
        return res.status(400).json(err);
    }
}

async function index(req, res) {
    console.log('controllers/api/events/index', req.body)
    const events = await Event.find({}).sort('createdAt').exec();
    // re-sort based upon the sortOrder of the populated categories
    // events.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.json(events);
}

// async function show(req, res) {
//     console.log('controllers/api/events/:id', req.body)
//     const event = await Event.findById(req.params.id);
//     res.json(event);
// }

async function deleteEvent(req, res) {
    // console.log('delete event', req, res)
    console.log('delete event')
    console.log('req.params.id ->', req.params.id)
    console.log('req.user._id ->', req.user._id)
    try {
        const deleteEvent = await Event.findByIdAndDelete(req.params.id)
        res.json(deleteEvent)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function update(req, res) {
    console.log('controllers/api/events/update')
    try {
        console.log('controllers/api/events/update', req.params.id)
        const event = await Event.findById(req.params.id);
        console.log(event)
        return res.json(event);
    } catch (err) {
        console.log('controllers/api/events/update: error')
        return res.status(400).json(err);
    }
}