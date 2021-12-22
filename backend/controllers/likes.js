const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const Likes = models.likes

// Like
exports.likePost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const postId = req.body.id;

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