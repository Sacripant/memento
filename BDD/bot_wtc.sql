-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 21 Mars 2017 à 16:13
-- Version du serveur :  5.7.17-0ubuntu0.16.04.1
-- Version de PHP :  5.6.30-7+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mementofr`
--

-- --------------------------------------------------------

--
-- Structure de la table `bot_wtc`
--

CREATE TABLE `bot_wtc` (
  `id` int(11) NOT NULL,
  `item` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `sections` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `bot_wtc`
--

INSERT INTO `bot_wtc` (`id`, `item`, `position`, `destination`, `sections`, `class`) VALUES
(22, '$("p:has(*[name=\'custom_7\'])")', '', '', 'default|printfacture|todo', 'repartition'),
(23, '$("p:has(*[name=\'custom_5\'])")', '', '', 'default|printfacture|todo', ''),
(21, '$("p:has(*[name=\'custom_8\'])")', '', '', 'default|printfacture|todo', 'taxe'),
(20, '$("p:has(*[name=\'custom_2\'])")', '', '', '', 'etat'),
(19, '$("p:has(*[name=\'custom_4\'])")', '', '', 'default|printfacture|projet', ''),
(18, '$("p:has(*[name=\'custom_3\'])")', '', '', 'default|printfacture|projet', ''),
(17, '$("p:has(*[name=\'custom_1\'])")', '', '', 'default|printfacture|projet', ''),
(16, '$(".section")', 'insertBefore', '$(".title")', '', ''),
(24, '$("p:has(*[name=\'custom_6\'])")', '', '', 'default|printfacture|todo', ''),
(25, '$("p:has(*[name=\'custom_10\'])")', '', '', 'default|printfacture|search|todo', 'num-date-devis'),
(27, '$("p:has(*[name=\'custom_9\'])")', '', '', 'default|printfacture|projet', 'parent'),
(28, '$("p:has(*[name=\'custom_11\'])")', '', '', 'default|printfacture|todo', 'total_HT disabled'),
(29, '$("p:has(*[name=\'custom_12\'])")', '', '', 'default|printfacture|todo', ''),
(30, '$("#txp-custom-field-group")', 'insertAfter', '$(".body")', '', ''),
(32, '$("#txp-write-sort-group")', '', '', 'default|printfacture|projet', '');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `bot_wtc`
--
ALTER TABLE `bot_wtc`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `bot_wtc`
--
ALTER TABLE `bot_wtc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
