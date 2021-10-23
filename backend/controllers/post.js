const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const fs = require("fs");

// Création d'un post
exports.createPost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ error: "Merci de remplir tous les champs." });
    }
    Post.create({
        title: req.body.title,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: userId
    })
        .then((post) => res.status(201).json(post))
        .catch((error) => res.status(400).json({ error }));
}

// Modification d'un post
exports.updatePost = (req, res) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(() => {
            Post.update(
                { content: req.body.content }
            ).then(() => res.status(201).json({ message: "Publication modifié !" }))
        })
        .catch((err) => {
            res.status(500).send({ message: "Une erreur est survenue lors de la modification du post." });
        });
}

// Suppression d'un post 
exports.deletePost = (req, res) => {
    Post.findOne({ where: { id: req.params.id } })
    models.comments.destroy({ where: { postId: Post.id } })
    Post.destroy()
        .then(() => {
            res.status(200).json({ message: "Publication supprimé avec succès" })
        })
        .catch(error => res.status(400).json({ error }));
}

// Récupérer tous les posts
exports.getAllPosts = (req, res) => {
    Post.findAll({ order: [["updatedAt", "DESC"]] })
        .then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
            res.status(400).json({ error });
        });
}

//  Récupérer un post
exports.getOnePost = (req, res) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
}
