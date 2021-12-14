const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const fs = require("fs");

// Création d'un post
exports.createPost = (req, res) => {
    // console.log("createPost");
    // console.log("req.body : ", req.body);

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

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
    console.log('delete post');
    Post.hasMany(Comment, { foreignKey: 'postId' })
    Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'cascade', hooks: true });
    Post.findOne({ where: { id: req.params.id } })
    if (Post.userId === req.body.id) {
        Post.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: "Post supprimé !" });
    } else {
        res.status(401).json({
            message: "Impossible de supprimer le post",
        });
    }
}

// Récupérer tous les posts
exports.getAllPosts = (req, res) => {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });
    Post.hasMany(Comment, { foreignKey: 'userId' });
    Post.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: ['id', 'userId', 'title', 'content', 'imageUrl', 'createdAt', 'updatedAt'],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName"],
            },
        ],
    })
        .then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
            res.status(400).json({ error: error.message });
        });
}

exports.getUserPosts = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });
    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Post.findAll({
        where: {
            userId: userId
        },
        order: [["updatedAt", "DESC"]],
        attributes: ['id', 'userId', 'title', 'content', 'imageUrl', 'createdAt', 'updatedAt'],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName"],
            },
            {
                model: Comment,
                attributes: ["id", "comment", "createdAt"],
                include: [
                    {
                        model: User,
                        attributes: ["firstName", "lastName"],
                    },
                ],
            },
        ],
    })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });

}

//  Récupérer un post
exports.getOnePost = (req, res) => {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'title', 'content', 'imageUrl', 'createdAt', 'updatedAt'],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName"]
            }
        ],
    })
        .then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
            res.status(400).json({ error: error.message });
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


// Post.findAll({
//     order: [["updatedAt", "DESC"]],
//     attributes: ['id', 'userId', 'title', 'content', 'imageUrl', 'createdAt', 'updatedAt'],
//     include: [
//         {
//             model: User,
//             attributes: ["firstName", "lastName"],
//         },
//         {
//             model: Comment, // recuperer les commentaire du  poste
//             attributes: ["id", "comment", "createdAt"],
//             include: [
//                 {
//                     model: User,
//                     attributes: ["firstName", "lastName"],
//                 },
//             ]
//         }
//     ],
// })