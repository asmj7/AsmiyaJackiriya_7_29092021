const models = require("../models/comments");
const comment = models.comments;
const jwt = require("jsonwebtoken");

// Création d'un commentaire
exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    comment.create({
        userId: userId,
        postId: req.params.id,
        commentId: req.body.id
    })
        .then(() => res.status(200).json({ message: "Commentaire créé !" }))
        .catch(() => res.status(400).json({ error: "Commentaire non créé" }));
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
        .catch((error) => res.status(404).json({ error }));
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
    comment.findAll({ order: [["id", "DESC"]] })
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}