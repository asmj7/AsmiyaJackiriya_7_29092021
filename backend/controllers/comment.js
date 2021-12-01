const models = require("../models");
const comment = models.comments;
const jwt = require("jsonwebtoken");
const userModel = models.users;

// Création d'un commentaire
exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    console.log(req)
    console.log("comment: " + comment)
    comment.create({
        userId: userId,
        postId: req.body.postId,
        comment: req.body.comment,
        // commentId: req.body.commentId
    })
        .then(() => res.status(200).json({ message: "Commentaire créé !" }))
        .catch((error) => {
            console.log(error);
        })
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
            console.log(error);
        })
}

// Suppression d'un commentaire
exports.deleteComment = (req, res) => {
    comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            comment.destroy({ where: { id: req.params.id } })
        })
}

// Récupérer les commentaires
exports.getAllComments = (req, res) => {
    console.log("postId: " + req.params.postId)
    userModel.hasMany(comment, { foreignKey: 'userId' });
    comment.belongsTo(userModel, { foreignKey: 'userId' });
    comment.findAll({
        where: {
            postId: req.params.postId
        },
        order: [["id", "DESC"]],
        attributes: ["comment"],
        include: [
            {
                model: userModel,
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
