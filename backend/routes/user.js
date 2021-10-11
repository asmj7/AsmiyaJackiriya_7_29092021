const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete('/:id',auth, userCtrl.deleteUser);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);

module.exports = router;