const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('groupomania','root', '', {
    host: "localhost",
    dialect : "mysql"
});

const User = sequelize.define('User', {
    id: {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey: true,
    },
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    password: DataTypes.STRING,
});

module.exports = Users;