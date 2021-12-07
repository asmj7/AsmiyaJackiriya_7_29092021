const models = require("../models");
const comment = models.comments;
const jwt = require("jsonwebtoken");
const userModel = models.users;

// Création d'un commentaire
exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    comment.create({
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
            if (comment.userId === userId){
                comment.destroy({ where: { id: req.body.id } })
            }
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
}

// Récupérer les commentaires
exports.getCommentsByPost = (req, res) => {
    // console.log(JSON.stringify(req.query));
    console.log("postId: " + req.query.postId)
    userModel.hasMany(comment, { foreignKey: 'userId' });
    comment.belongsTo(userModel, { foreignKey: 'userId' });
    comment.findAll({
        where: {
            postId: req.query.postId
        },
        attributes: ["comment", "createdAt", "id"],
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
