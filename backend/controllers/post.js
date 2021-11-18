const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const fs = require("fs");

// Création d'un post
exports.createPost = (req, res) => {
    // console.log("createPost")
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log('userId:' + userId);

    if (!req.body.content) {
        return res.status(400).json({ error: "Merci de remplir tous les champs." });
    }

    Post.create({
        title: req.body.title,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: userId
    })
        .then((post) => {
            res.status(201).json(post);
            console.log('contenu' + post.content);
        })
        .catch((error) => {
            console.log(error)
            return res.status(400).json({ error })
        });
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

// Like et dislikes 
exports.likeDislikeSauce = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const like = req.body.like;
            let opinions = {};
            switch (like) {
                case -1:  //  Si l'utilisateur dislike le post 
                    opinions = {
                        $push: { usersDisliked: req.body.userId },
                        $inc: { dislikes: 1 }
                    }
                    break;
                case 0: // Si l'utilisateur enlève son like / dislike
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
            Post.updateOne({ _id: req.params.id }, opinions)
                .then(() => res.status(200).json({ message: "Le post a été liké" }))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};
