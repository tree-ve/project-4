// const jwt = require('jsonwebtoken');
const Group = require('../../models/group')
const User = require('../../models/user');
const Event =require('../../models/event');
const { default: userEvent } = require('@testing-library/user-event');
// const bcrypt = require('bcrypt');

module.exports = {
    create,
    index,
    show,
    delete: deleteGroup,
    update,
    // getEvents
    // new: newGroup
};
    
async function create(req, res) {
    console.log('controllers/api/groups/create')
    try {
        console.log('controllers/api/groups/create', req.body)
        const group = await Group.create(req.body);
        console.log(group)
        return res.json(group);
    } catch (err) {
        console.log('controllers/api/groups/create: error')
        return res.status(400).json(err);
    }
}

async function index(req, res) {
    // const groups = await Group.find({}).sort('createdAt').exec();
    console.log('controllers/api/groups/index', req.user._id)
    const groups = await Group.find({ users: req.user._id }).sort('createdAt').exec();
    // console.log('groups', groups)
    res.json(groups);
}

async function show(req, res) {
    // console.log('controllers/api/groups/:id', req.params.id)
    try {
        const group = await Group.findById(req.params.id);
        // console.log(group.users)
        // console.log(group.users.length)
        const ownerId = group.owner
        const owner = await User.findById(ownerId)
        // console.log('group.owner -> ', group.owner)
        // console.log('owner -> ', owner)
        group.owner = owner
        const groupUsers = []
        for (let i = 0; i < group.users.length; i++) {
            // console.log(group.users[i])
            const userId = group.users[i]
            const user = await User.findById(userId)
            groupUsers.push(user)
        }
        group.users = groupUsers
        const groupUserEvents = []
        for (let i = 0; i < group.users.length; i++) {
            // console.log(group.users[i])
            const userEvents = await Event.find({ user: group.users[i]._id})
            // console.log(userEvents)
            groupUserEvents.push(userEvents)
        }
        console.log(groupUserEvents)
        // const groupUsersTest = group.users.forEach(groupUser =>
        //     console.log('TEST!!!: ', groupUser);
        //     const userEvents = await Event.find({ user: groupUser._id})
        // )
        res.json({group: group, groupUserEvents: groupUserEvents});
    } catch (error) {
        
    }
    
}

async function deleteGroup(req, res) {
    // console.log('delete group', req, res)
    console.log('delete group')
    console.log('req.params.id ->', req.params.id)
    console.log('req.user._id ->', req.user._id)
    // const user = await User.findOne({ 'user._id': req.user._id, 'group.owner': req.params.id});
    // const group = await Group.findById(req.params.id);
    // console.log("user -> ", user)
    // console.log("group -> ", group)
    // if (!group) {
    //     console.log('not valid group?');
    //     // return res.redirect('/campaigns')
    // };
    // group.deleteOne(
    //     { _id: req.params.id }
    // )

    // return res.redirect('/groups');
    try {
        const deleteGroup = await Group.findByIdAndDelete(req.params.id)
        res.json(deleteGroup)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function update(req, res) {
    console.log('controllers/api/groups/update')
    try {
        console.log('controllers/api/groups/update', req.params.id)
        const group = await Group.findById(req.params.id);
        console.log(group)
        return res.json(group);
    } catch (err) {
        console.log('controllers/api/groups/update: error')
        return res.status(400).json(err);
    }
}

// async function getEvents(req, res) {
//     try {
//         console.log('controllers/api/groups/getEvents')
//     } catch (error) {
        
//     }
// }