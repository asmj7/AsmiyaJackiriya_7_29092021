const models = require('../models');
const jwt = require('jsonwebtoken');
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const Likes = models.likes

// Like et dislikes 
exports.likePost = (req, res, next) => {
    Post.hasMany(Likes, {foreignKey: 'postId'})
    Likes.belongsTo(Post, { foreignKey: 'postId', onDelete: 'cascade', hooks: true });
    User.hasMany(Likes, {foreignKey: 'userId'})
    Likes.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const found = Likes.findOne({
        where: { 
            id: req.params.id ,
            userId: userId 
        },
        attributes: ['id', 'userId', 'postId'],
    })

    if (!found) {
        Likes.create({ postId: postId, userId: userId })
        res.status(200).json({ message: "Vous avez liké le post" });
    } else {
        Likes.destroy({
            where: { id: req.params.id, userId: userId }
        })
        res.json({
            message: "Vous n\'avez pas encore liké le post",
        });
    }
};