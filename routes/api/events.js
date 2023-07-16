const express = require('express');
const router = express.Router();
const eventsCtrl = require('../../controllers/api/events');
// const ensureLoggedIn = require('../../config/ensureLoggedIn');

// // GET /api/users/check-token
// router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// POST /api/events
router.get('/', eventsCtrl.index);

// POST /api/events/new
router.post('/new', eventsCtrl.create);

// POST /api/events/:id
// router.get('/:id', eventsCtrl.show);

// DELETE /api/events/:id
router.delete('/:id', eventsCtrl.delete);


module.exports = router;