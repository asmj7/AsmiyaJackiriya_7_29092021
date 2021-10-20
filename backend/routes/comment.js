const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post("/comment",auth, commentCtrl.createComment);
router.put("/comment", auth, commentCtrl.updateComment);
router.delete("/:id",auth, commentCtrl.deleteComment);
router.get("/allComments", auth, commentCtrl.getAllComments);

module.exports = router;