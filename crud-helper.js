// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Group = require('./models/group');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// const Event = require('./models/event');
// const Message = require('./models/message');

// Local variables will come in handy for holding retrieved documents
// let user, item, category, order;
// let users, items, categories, orders;
let user, group, event, message;
let users, groups, events, messages;