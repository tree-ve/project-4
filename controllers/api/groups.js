// const jwt = require('jsonwebtoken');
const Group = require('../../models/group')
// const bcrypt = require('bcrypt');

module.exports = {
    create,
    index
    // new: newGroup
};
    
async function create(req, res) {
    try {
        // Add the user to the database
        console.log('controllers/api/groups/create', req.body)
        const group = await Group.create(req.body);
        // token will be a string
        //! const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        //! console.log(token)
        console.log(group)
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

// async function newGroup(req, res) {
//     try {
//         // Add the user to the database
//         console.log(req.body)
//         //! const user = await User.create(req.body);
//         // token will be a string
//         //! const token = createJWT(user);
//         // Yes, we can use res.json to send back just a string
//         // The client code needs to take this into consideration
//         //! console.log(token)
//         //! return res.json(token);
//     } catch (err) {
//         // Client will check for non-2xx status code 
//         // 400 = Bad Request
//         return res.status(400).json(err);
//     }
// }