const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const Likes = models.likes
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
    if (Post.userId === req.body.id || isAdmin === true) {
        Post.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: `Post supprimé !${req.params.id}` });
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
    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    // User.hasMany(Comment, { foreignKey: 'userId' });
    // Comment.belongsTo(Post, { foreignKey: 'userId' });
    Post.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: ['id', 'userId', 'title', "likes", 'content', 'imageUrl', 'createdAt', 'updatedAt'],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName", "id"],
            },
            {
                model: Comment,
                attributes: ["comment"],
            }
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
            userId: req.params.id
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
    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'title', 'content', 'likes', 'imageUrl', 'createdAt', 'updatedAt'],
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName", "id"]
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
        .then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
            res.status(400).json({ error: error.message });
        });
}

// Like et dislikes 
exports.likePost = (req, res, next) => {
    // Post.hasMany(Likes, {foreignKey: 'postId'})
    // Likes.belongsTo(Post, { foreignKey: 'postId', onDelete: 'cascade', hooks: true });
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const postId = req.params.id

    const found = Likes.findOne({
        where: { postId: postId, userId: userId },
        attributes: ['id', 'userId', 'postId'],
    });

    if (!found) {
        Likes.create({ postId: postId, userId: userId })
        res.status(200).json({ message: "Vous avez liké le post" });
    } else {
        Likes.destroy({
            where: { postId: postId, userId: userId }
        })
        res.json({
            message: "Vous n\'avez pas encore liké le post",
        });
    }
};