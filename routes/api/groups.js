const express = require('express');
const router = express.Router();
const groupsCtrl = require('../../controllers/api/groups');
// const ensureLoggedIn = require('../../config/ensureLoggedIn');

// // GET /api/users/check-token
// router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// GET /api/groups
router.get('/', groupsCtrl.index);

// POST /api/groups/new
router.post('/new', groupsCtrl.create);

// GET /api/groups/:id
router.get('/:id', groupsCtrl.show);

// DELETE /api/groups/:id
router.delete('/:id', groupsCtrl.delete);

// PUT /api/groups/:id
router.put('/:id', groupsCtrl.update);

module.exports = router;