// const jwt = require('jsonwebtoken');
const Group = require('../../models/group')
// const bcrypt = require('bcrypt');

module.exports = {
    create,
    index,
    show
    // new: newGroup
};
    
async function create(req, res) {
    console.log('controllers/api/groups/create')
    try {
        console.log('controllers/api/groups/create', req.body)
        const group = await Group.create(req.body);
        //! const token = createJWT(user);
        //! console.log(token)
        console.log(group)
        return res.json(group);
        //! return res.json(token);
    } catch (err) {
        // Client will check for non-2xx status code 
        // 400 = Bad Request
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