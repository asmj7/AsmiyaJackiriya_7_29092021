const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const cryptoJs = require('crypto-js/md5');
const sequelize = require('../config/sequelize');

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    if (
        !req.body.prenom ||
        !req.body.nom ||
        !req.body.email ||
        !req.body.password
    ) {
        return res.status(400).json({ error: 'Merci de remplir tous les champs' })
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        User.create({
                            email: cryptoJs(req.body.email).toString(),
                            password: hash,
                            prenom: req.body.prenom,
                            nom: req.body.nom
                        })
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));

            } else {
                res.status(409).json({ error: 'Cet utilisateur existe déjà' })
            }
        })
};

// Connexion à un compte déjà existant
exports.login = (req, res, next) => {
    User.findOne({ email: cryptoJs(req.body.email).toString() })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' })
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        "RANDOM_TOKEN_SECRET",
                        { expiresIn: "24h" }
                    )
                    res.status(200).json({
                        userId: user._id,
                        token
                    })
                })
                .catch(error => res.status(500).json({ error: error.message }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (user.id === userId) {
                user.destroy()
                    .then(() => {
                        res.status(200).json({ message: 'Votre compte a bien été supprimé !' });
                    }).catch(err => res.status(400).json({ message: 'Votre compte n\'a pas pu être supprimé.' }));
            };
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupérer tous les utilisateurs 
exports.getAllUsers = (req, res) => {
    User.findAll({
        attributes : ['id', 'prenom', 'nom']
    })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Récupérer un utilisateur
exports.getOneUser = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(404).json({ error }));
  };
