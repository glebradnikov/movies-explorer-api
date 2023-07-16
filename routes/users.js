const express = require('express');
const { getUser, updateUser } = require('../controllers/users');

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;
