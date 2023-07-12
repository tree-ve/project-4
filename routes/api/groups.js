const express = require('express');
const router = express.Router();
const groupsCtrl = require('../../controllers/api/groups');
// const ensureLoggedIn = require('../../config/ensureLoggedIn');

// // GET /api/users/check-token
// router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// POST /api/groups
router.get('/', groupsCtrl.index);

// POST /api/groups/new
router.post('/new', groupsCtrl.create);

// POST /api/groups/:id
router.get('/:id', groupsCtrl.show);


module.exports = router;