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
    console.log(req.body.id);
    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Comment.findOne({ where: { id: req.params.id } })
    if (Comment.userId === req.body.id) {
        Comment.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.status(200).json({
                    message: "Commentaire supprimé !",
                });
            })
    } else {
        res.status(401).json({
            message: "Impossible de supprimer le post",
        });
    }
}

// Récupérer les commentaires
exports.getCommentsByPost = (req, res) => {
    console.log("postId: " + req.params.id)
    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Comment.findAll({
        where: {
            postId: req.params.id
        },
        attributes: ["comment", "createdAt", "userId"],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName", "id"],
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
