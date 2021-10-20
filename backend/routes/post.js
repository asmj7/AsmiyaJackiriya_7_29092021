const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.post("/",auth,multer, postCtrl.createPost);
router.put("/", auth, postCtrl.updatePost);
router.delete("/",auth, postCtrl.deletePost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);

module.exports = router;