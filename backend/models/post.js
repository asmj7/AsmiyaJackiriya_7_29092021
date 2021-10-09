const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize')

const Post = sequelize.define("post", {
    id: {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
    },
    userId : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    imageUrl : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    createdAt : {
        type : DataTypes.DATE,
        allowNull : false,
    },
    updatedAt : {
        type : DataTypes.DATE,
        allowNull : false,
    }

});

module.exports = Post;