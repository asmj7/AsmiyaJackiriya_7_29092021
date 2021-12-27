const models = require('../models');
const jwt = require('jsonwebtoken');
const Likes = models.likes

// Like
exports.likePost = (req, res, next) => {
    console.log('userId:' + req.body.userId);
   
    const postId = req.body.postId;
    const userId = req.body.userId

    Likes.findOne({
        where: { userId: userId, postId: postId }
    }).then(liked => {
        if (!liked) {
            Likes.create({
                userId: userId,
                postId: postId
            }).then(() => res.status(201).json({ message: "Le post a été liké !" }))
                .catch(error => res.status(500).json({ error: error.message }))
        } else {
            Likes.destroy({
                where: { userId: userId, postId: postId }
            }).then(() => res.status(200).json({ message: "Vous n'avez pas encore liké le post" }))
                .catch(error => res.status(500).json({ error: error.message }))
        }
    }).catch(error => res.status(500).json({ error: "Oups ! Un problème est survenu. Veuillez nous excuser." }))
}