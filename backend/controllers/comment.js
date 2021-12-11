const models = require('../models');
const jwt = require("jsonwebtoken");
const Post = models.posts;
const User = models.users;
const Comment = models.comments;

// Création d'un commentaire
exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    Comment.create({
        userId: userId,
        postId: req.body.postId,
        comment: req.body.comment,
    })
        .then(() => res.status(200).json({ message: "Commentaire créé !" }))
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
}

// Modification du commentaire
exports.updateComment = (req, res) => {
    comment.findOne({ where: { id: req.params.id } })
        .then(() => {
            comment.update(
                { comment: req.body.comment },
                { where: { id: req.params.id } }
            )
        })
        .then(() => {
            res.status(201).json({ message: " Commentaire modifié" });
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
}

// Suppression d'un commentaire
exports.deleteComment = (req, res) => {
    comment.findOne({ where: { id: req.body.id } })
        .then((comment) => {
            if (comment.userId === userId) {
                comment.destroy({ where: { id: req.body.id } })
            }
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
}

// Récupérer les commentaires
exports.getCommentsByPost = (req, res) => {
    console.log("postId: " + req.params.id)
    User.hasMany(Comment, {foreignKey: 'postId'});
    Comment.belongsTo(User, {foreignKey: 'postId'});
    Comment.findAll({
        where: {
            postId: req.params.id
        },
        attributes: ["comment", "createdAt"],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName"],
            },
        ],
    })
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
}
