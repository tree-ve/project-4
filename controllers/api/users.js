const jwt = require('jsonwebtoken');
const User = require('../../models/user')
const Event = require('../../models/event')
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,
    show
};
    
async function create(req, res) {
    try {
        // Add the user to the database
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        console.log(token)
        return res.json(token);
    } catch (err) {
        // Client will check for non-2xx status code 
        // 400 = Bad Request
        return res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        // const match = await user.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json( createJWT(user) );
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function show(req, res) {
    try {
        console.log('users/show')
        console.log('req.params', req.params)
        console.log('res.user', req.user)
        const user = await User.findById(req.params.id);
        const events = await Event.find({user: user._id})
        console.log('user', user)
        console.log('events', events)
        res.json({user: user, events: events});
    } catch (error) {
        console.log(error)
    }
}


/*-- Helper Functions --*/

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '7d' }
    );
}