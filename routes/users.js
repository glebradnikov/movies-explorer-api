const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/validators');

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', validateUser, updateUser);

module.exports = router;
