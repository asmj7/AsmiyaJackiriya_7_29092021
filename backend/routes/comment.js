const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post("/create",auth, commentCtrl.createComment);
router.put("/update", auth, commentCtrl.updateComment);
router.delete("/:id",auth, commentCtrl.deleteComment);
router.get("/", auth, commentCtrl.getAllComments);

module.exports = router;