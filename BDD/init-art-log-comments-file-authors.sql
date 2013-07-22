# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Hôte: Localhost (MySQL 5.5.9)
# Base de données: txp_451
# Temps de génération: 2013-06-23 15:58:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table textpattern
# ------------------------------------------------------------

DROP TABLE IF EXISTS `textpattern`;

CREATE TABLE `textpattern` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Posted` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Expires` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `AuthorID` varchar(64) NOT NULL DEFAULT '',
  `LastMod` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `LastModID` varchar(64) NOT NULL DEFAULT '',
  `Title` varchar(255) NOT NULL DEFAULT '',
  `Title_html` varchar(255) NOT NULL DEFAULT '',
  `Body` mediumtext NOT NULL,
  `Body_html` mediumtext NOT NULL,
  `Excerpt` text NOT NULL,
  `Excerpt_html` mediumtext NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT '',
  `Category1` varchar(128) NOT NULL DEFAULT '',
  `Category2` varchar(128) NOT NULL DEFAULT '',
  `Annotate` int(2) NOT NULL DEFAULT '0',
  `AnnotateInvite` varchar(255) NOT NULL DEFAULT '',
  `comments_count` int(8) NOT NULL DEFAULT '0',
  `Status` int(2) NOT NULL DEFAULT '4',
  `textile_body` int(2) NOT NULL DEFAULT '1',
  `textile_excerpt` int(2) NOT NULL DEFAULT '1',
  `Section` varchar(64) NOT NULL DEFAULT '',
  `override_form` varchar(255) NOT NULL DEFAULT '',
  `Keywords` varchar(255) NOT NULL DEFAULT '',
  `url_title` varchar(255) NOT NULL DEFAULT '',
  `custom_1` varchar(255) NOT NULL DEFAULT '',
  `custom_2` varchar(255) NOT NULL DEFAULT '',
  `custom_3` varchar(255) NOT NULL DEFAULT '',
  `custom_4` varchar(255) NOT NULL DEFAULT '',
  `custom_5` varchar(255) NOT NULL DEFAULT '',
  `custom_6` varchar(255) NOT NULL DEFAULT '',
  `custom_7` varchar(255) NOT NULL DEFAULT '',
  `custom_8` varchar(255) NOT NULL DEFAULT '',
  `custom_9` varchar(255) NOT NULL DEFAULT '',
  `custom_10` varchar(255) NOT NULL DEFAULT '',
  `uid` varchar(32) NOT NULL DEFAULT '',
  `feed_time` date NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`ID`),
  KEY `categories_idx` (`Category1`(10),`Category2`(10)),
  KEY `Posted` (`Posted`),
  KEY `section_status_idx` (`Section`,`Status`),
  KEY `Expires_idx` (`Expires`),
  KEY `author_idx` (`AuthorID`),
  KEY `url_title_idx` (`url_title`),
  FULLTEXT KEY `searching` (`Title`,`Body`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=1;

LOCK TABLES `textpattern` WRITE;
/*!40000 ALTER TABLE `textpattern` DISABLE KEYS */;

INSERT INTO `textpattern` (`ID`, `Posted`, `Expires`, `AuthorID`, `LastMod`, `LastModID`, `Title`, `Title_html`, `Body`, `Body_html`, `Excerpt`, `Excerpt_html`, `Image`, `Category1`, `Category2`, `Annotate`, `AnnotateInvite`, `comments_count`, `Status`, `textile_body`, `textile_excerpt`, `Section`, `override_form`, `Keywords`, `url_title`, `custom_1`, `custom_2`, `custom_3`, `custom_4`, `custom_5`, `custom_6`, `custom_7`, `custom_8`, `custom_9`, `custom_10`, `uid`, `feed_time`)
VALUES
	(1,'2013-06-23 15:54:11','0000-00-00 00:00:00','admin','2013-06-23 15:54:11','','Welcome to Your Site!','','h3. What do you want to do next?\n\n* Modify or even delete this article? The \"article list\":/textpattern-4.5.1/textpattern/index.php?event=list is the place to start.\n* Change this site\'s name, or modify the style of the URLs? It\'s all up to your \"preferences\":/textpattern-4.5.1/textpattern/index.php?event=prefs.\n* Get yourself acquainted with Textile, the humane web text generator which comes with Textpattern? The basics are \"simple\":http://textpattern.com/textile-sandbox. If you want to learn more about Textile, you can dig into an \"extensive manual\":http://textpattern.com/textile-reference-manual later.\n* Be guided through your \"Textpattern first steps\":http://textpattern.com/textpattern-first-steps by completing some basic tasks?\n* Study the \"Textpattern Semantic Model?\":http://textpattern.com/textpattern-semantic-model\n* Add \"another user\":/textpattern-4.5.1/textpattern/index.php?event=admin, or extend the capabilities with \"third party plugins\":/textpattern-4.5.1/textpattern/index.php?event=plugin you discovered from the central plugin directory at \"Textpattern Resources\":http://textpattern.org/?\n* Dive in and learn by trial and error? Then please note:\n** When you \"write\":/textpattern-4.5.1/textpattern/index.php?event=article an article you assign it to a section of your site.\n** Sections use a \"page template\":/textpattern-4.5.1/textpattern/index.php?event=page and a \"style\":/textpattern-4.5.1/textpattern/index.php?event=css as an output scaffold.\n** Page templates use HTML and Textpattern tags (like this: @<txp:article />@) to build the markup.\n** Some Textpattern tags use \"forms\":/textpattern-4.5.1/textpattern/index.php?event=form, which are building blocks for reusable snippets of code and markup you may build and use at your discretion.\n\nThere are a host of \"Frequently Asked Questions\":http://textpattern.com/faq/ to help you get started.\n\n\"Textpattern tags\":http://textpattern.com/textpattern-tag-reference, their attributes and values are as well explained as sampled at the \"User Documentation\":http://textpattern.net/, where you will also find valuable tips and tutorials.\n\nIf all else fails, there\'s a whole crowd of friendly, helpful people over at the \"Textpattern support forum\":http://forum.textpattern.com/. Come and pay a visit!\n','	<h3>What do you want to do next?</h3>\n\n	<ul>\n		<li>Modify or even delete this article? The <a href=\"/textpattern-4.5.1/textpattern/index.php?event=list\">article list</a> is the place to start.</li>\n		<li>Change this site&#8217;s name, or modify the style of the <span class=\"caps\">URL</span>s? It&#8217;s all up to your <a href=\"/textpattern-4.5.1/textpattern/index.php?event=prefs\">preferences</a>.</li>\n		<li>Get yourself acquainted with Textile, the humane web text generator which comes with Textpattern? The basics are <a href=\"http://textpattern.com/textile-sandbox\">simple</a>. If you want to learn more about Textile, you can dig into an <a href=\"http://textpattern.com/textile-reference-manual\">extensive manual</a> later.</li>\n		<li>Be guided through your <a href=\"http://textpattern.com/textpattern-first-steps\">Textpattern first steps</a> by completing some basic tasks?</li>\n		<li>Study the <a href=\"http://textpattern.com/textpattern-semantic-model\">Textpattern Semantic Model?</a></li>\n		<li>Add <a href=\"/textpattern-4.5.1/textpattern/index.php?event=admin\">another user</a>, or extend the capabilities with <a href=\"/textpattern-4.5.1/textpattern/index.php?event=plugin\">third party plugins</a> you discovered from the central plugin directory at <a href=\"http://textpattern.org/\">Textpattern Resources</a>?</li>\n		<li>Dive in and learn by trial and error? Then please note:\n	<ul>\n		<li>When you <a href=\"/textpattern-4.5.1/textpattern/index.php?event=article\">write</a> an article you assign it to a section of your site.</li>\n		<li>Sections use a <a href=\"/textpattern-4.5.1/textpattern/index.php?event=page\">page template</a> and a <a href=\"/textpattern-4.5.1/textpattern/index.php?event=css\">style</a> as an output scaffold.</li>\n		<li>Page templates use <span class=\"caps\">HTML</span> and Textpattern tags (like this: <code>&lt;txp:article /&gt;</code>) to build the markup.</li>\n		<li>Some Textpattern tags use <a href=\"/textpattern-4.5.1/textpattern/index.php?event=form\">forms</a>, which are building blocks for reusable snippets of code and markup you may build and use at your discretion.</li>\n	</ul></li>\n	</ul>\n\n	<p>There are a host of <a href=\"http://textpattern.com/faq/\">Frequently Asked Questions</a> to help you get started.</p>\n\n	<p><a href=\"http://textpattern.com/textpattern-tag-reference\">Textpattern tags</a>, their attributes and values are as well explained as sampled at the <a href=\"http://textpattern.net/\">User Documentation</a>, where you will also find valuable tips and tutorials.</p>\n\n	<p>If all else fails, there&#8217;s a whole crowd of friendly, helpful people over at the <a href=\"http://forum.textpattern.com/\">Textpattern support forum</a>. Come and pay a visit!</p>','','','','hope-for-the-future','meaningful-labor',1,'Commentaire',1,4,1,1,'articles','','','welcome-to-your-site','','','','','','','','','','','577bbb3a183b2ced23806487b931f883','2013-06-23');

/*!40000 ALTER TABLE `textpattern` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table txp_discuss
# ------------------------------------------------------------

DROP TABLE IF EXISTS `txp_discuss`;

CREATE TABLE `txp_discuss` (
  `discussid` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `parentid` int(8) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `web` varchar(255) NOT NULL DEFAULT '',
  `ip` varchar(100) NOT NULL DEFAULT '',
  `posted` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `message` text NOT NULL,
  `visible` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`discussid`),
  KEY `parentid` (`parentid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=1;

LOCK TABLES `txp_discuss` WRITE;
/*!40000 ALTER TABLE `txp_discuss` DISABLE KEYS */;

INSERT INTO `txp_discuss` (`discussid`, `parentid`, `name`, `email`, `web`, `ip`, `posted`, `message`, `visible`)
VALUES
	(000001,1,'Donald Swain','donald.swain@example.com','example.com','127.0.0.1','2005-07-22 14:11:32','<p>I enjoy your site very much.</p>',1);

/*!40000 ALTER TABLE `txp_discuss` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table txp_discuss_ipban
# ------------------------------------------------------------

DROP TABLE IF EXISTS `txp_discuss_ipban`;

CREATE TABLE `txp_discuss_ipban` (
  `ip` varchar(255) NOT NULL DEFAULT '',
  `name_used` varchar(255) NOT NULL DEFAULT '',
  `date_banned` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `banned_on_message` int(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Affichage de la table txp_discuss_nonce
# ------------------------------------------------------------

DROP TABLE IF EXISTS `txp_discuss_nonce`;

CREATE TABLE `txp_discuss_nonce` (
  `issue_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `nonce` varchar(255) NOT NULL DEFAULT '',
  `used` tinyint(4) NOT NULL DEFAULT '0',
  `secret` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`nonce`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Affichage de la table txp_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `txp_file`;

CREATE TABLE `txp_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL DEFAULT '',
  `permissions` varchar(32) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `downloads` int(4) unsigned NOT NULL DEFAULT '0',
  `status` smallint(6) NOT NULL DEFAULT '4',
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `size` bigint(20) DEFAULT NULL,
  `author` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `author_idx` (`author`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=0;



# Affichage de la table txp_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `txp_log`;

CREATE TABLE `txp_log` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `host` varchar(255) NOT NULL DEFAULT '',
  `page` varchar(255) NOT NULL DEFAULT '',
  `refer` mediumtext NOT NULL,
  `status` int(11) NOT NULL DEFAULT '200',
  `method` varchar(16) NOT NULL DEFAULT 'GET',
  `ip` varchar(16) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `time` (`time`),
  KEY `ip` (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Affichage de la table txp_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `txp_users`;

CREATE TABLE `txp_users` (
  `user_id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `pass` varchar(128) NOT NULL,
  `RealName` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(254) NOT NULL DEFAULT '',
  `privs` tinyint(2) NOT NULL DEFAULT '1',
  `last_access` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `nonce` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=1;

LOCK TABLES `txp_users` WRITE;
/*!40000 ALTER TABLE `txp_users` DISABLE KEYS */;

INSERT INTO `txp_users` (`user_id`, `name`, `pass`, `RealName`, `email`, `privs`, `last_access`, `nonce`)
VALUES
	(1,'admin','$P$B/TjLZIewIbPkAYQDMHRDhoL3goiW1/','compte defaut','admin@admin.com',1,'2013-06-23 15:54:34','c35169807789851dbc0f57bd7266a159');

/*!40000 ALTER TABLE `txp_users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
