const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post("/create",auth, commentCtrl.createComment);
router.put("/update", auth, commentCtrl.updateComment);
router.delete("/delete/:id",auth, commentCtrl.deleteComment);
router.get("/:id", auth, commentCtrl.getCommentsByPost);

module.exports = router;