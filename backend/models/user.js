const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize')

const User = sequelize.define('User', {
    id: {
        type : DataTypes.INTEGER,
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
    password: DataTypes.STRING
});

User.sync()
    .then(() => console.log("La table est créé avec succès"))
    .catch(error => console.log(error));

module.exports = User;