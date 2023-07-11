const express = require('express');
const router = express.Router();
const groupsCtrl = require('../../controllers/api/groups');
// const ensureLoggedIn = require('../../config/ensureLoggedIn');

// // GET /api/users/check-token
// router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// POST /api/groups
router.post('/', groupsCtrl.create);

// POST /api/groups/index
router.post('/index', groupsCtrl.index);

// // POST /api/users/login
// router.post('/login', usersCtrl.login);

module.exports = router;