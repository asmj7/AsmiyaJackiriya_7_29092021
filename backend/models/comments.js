const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('groupomania','root', '', {
    host: "localhost",
    dialect : "mysql"
});

const Comments = sequelize.define("comment", {
    id: {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
    },
    userId : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    postId : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    comment : {
        type : DataTypes.TEXT,
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

module.exports = Comments;