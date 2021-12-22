const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const Likes = models.likes

// Like
exports.likePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })
        .then(post => {
            const like = req.body.like;
            let opinions = {};
            switch (like) {
                case 0: // Si l'utilisateur enlève son like
                    for (let userId of post.usersDisliked)
                        if (req.body.userId === userId) {
                            opinions = {
                                $pull: { usersDisliked: userId },
                                $inc: { dislikes: -1 }
                            };
                        };
                    for (let userId of post.usersLiked)
                        if (req.body.userId === userId) {
                            opinions = {
                                $pull: { usersLiked: userId },
                                $inc: { likes: -1 }
                            };
                        };
                    break;
                case 1:  // Si l'utilisateur like un post
                    opinions = {
                        $push: { usersLiked: req.body.userId },
                        $inc: { likes: 1 }
                    };
                    break;
            };
            Post.updateOne({ id: req.params.id }, opinions)
                .then(() => res.status(200).json({ message: "Le post a été liké" }))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};