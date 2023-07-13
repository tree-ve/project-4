// const jwt = require('jsonwebtoken');
const Group = require('../../models/group')
// const User = require('../../models/user');
// const bcrypt = require('bcrypt');

module.exports = {
    create,
    index,
    show,
    delete: deleteGroup
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
        console.log('controllers/api/groups: error')
        return res.status(400).json(err);
    }
}

async function index(req, res) {
    console.log('controllers/api/groups/index', req.body)
    const groups = await Group.find({}).sort('createdAt').exec();
    // re-sort based upon the sortOrder of the populated categories
    // groups.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.json(groups);
}

async function show(req, res) {
    console.log('controllers/api/groups/:id', req.body)
    const group = await Group.findById(req.params.id);
    res.json(group);
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