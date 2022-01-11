-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 28 déc. 2021 à 22:30
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userId` (`userId`),
  KEY `FK_postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `comment`, `createdAt`, `updatedAt`) VALUES
(25, 7, 48, 'Salut ! J\'utilise \'Inoreader\', simple et efficace :)', '2021-12-28 22:29:26', '2021-12-28 22:29:25');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userId` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(46, 54, 'Bienvenue sur Groupomania', 'Le but de cet outil est de faciliter les interactions entre collègues.                                                                  \nN\'hésitez pas à partager votre expérience avec nous !', 'http://localhost:3000/images/social-media.jpg1640729535105.jpg', '2021-12-28 22:12:15', '2021-12-28 22:12:15'),
(47, 7, 'Hello tout le monde', 'J\'ai un petit soucis avec github pages, lorsque j\'accède à la page githubpages, le css ne se charge pas.\n                                                                     \nSi vous pouviez m\'aider sur ce point ça m\'arrangerait, Merci d\'avance à vous!                              ', NULL, '2021-12-28 22:23:58', '2021-12-28 22:23:58'),
(48, 55, 'Bonjour tout le monde ! ', 'Qu\'utilisez-vous comme outil de veille ?', NULL, '2021-12-28 22:27:35', '2021-12-28 22:27:35');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(40) DEFAULT NULL,
  `lastName` varchar(40) DEFAULT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `isAdmin` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `isAdmin`) VALUES
(7, 'Asmiya', 'J', '1aedb8d9dc4751e229a335e371db8058', '$2b$10$bZHRGYggwBTideG2aZTwQeOL2kh.H4GQ9c0ryfE791UGpLuOTvm.G', 0),
(32, 'Test345', 'Test88', '8ddd56dc976541451201ef75c1e24006', '$2b$10$/7304TOL6bR84UqqARDp/e9BTlre8VqLT0PVGV10svmW37SO0oI6C', 0),
(54, 'Equipe ', 'Groupomania', '1d2ab164559aaf8a30eebf516d2f63ad', '$2b$10$bOnfXKBnFFVrrWZXtY1qpO6PgJXnlDvPRVtwWttUaS3wySkLwOIKK', 0),
(55, 'Laurie', 'M', 'dfe37b47a4d6575c385feaa92aeab8a7', '$2b$10$sbBgrK/Hry13dcnHG9hEX.quuDnisA.SAacKXHblp5/ZMJT12BLpu', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;