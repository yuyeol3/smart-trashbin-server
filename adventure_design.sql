-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: adventure_design
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trash_bins`
--

DROP TABLE IF EXISTS `trash_bins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash_bins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `cert_key` varchar(100) DEFAULT NULL,
  `location` text,
  `recent_data` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `fk_recent_data` (`recent_data`),
  CONSTRAINT `fk_recent_data` FOREIGN KEY (`recent_data`) REFERENCES `trash_bins_log` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_bins`
--

LOCK TABLES `trash_bins` WRITE;
/*!40000 ALTER TABLE `trash_bins` DISABLE KEYS */;
INSERT INTO `trash_bins` VALUES (11,'어벤디','$2b$10$ZdNSzWNuxMnvUmnTcZOQs.3ASqPAIXr2U9FV4iv9crIWdP1RHwHPi','6공학관',7),(13,'adventure design','$2b$10$Vrzii1r7dqBLC4MW8cpWOeB1PV0gOlFsVW4HZfjIgaurjE659jSzK','제6공학관 6409',NULL);
/*!40000 ALTER TABLE `trash_bins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trash_bins_log`
--

DROP TABLE IF EXISTS `trash_bins_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash_bins_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pet` float DEFAULT NULL,
  `can` float DEFAULT NULL,
  `others` float DEFAULT NULL,
  `trash_bin_id` int NOT NULL,
  `weight` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trash_bin_id` (`trash_bin_id`),
  CONSTRAINT `fk_trash_bin_id` FOREIGN KEY (`trash_bin_id`) REFERENCES `trash_bins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_bins_log`
--

LOCK TABLES `trash_bins_log` WRITE;
/*!40000 ALTER TABLE `trash_bins_log` DISABLE KEYS */;
INSERT INTO `trash_bins_log` VALUES (7,50,35.9,20,11,145.2);
/*!40000 ALTER TABLE `trash_bins_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(40) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$12$fEimCcSHFUXocXfTnRU9uO77.0b5uHz8SCjMdxDUCtYLOp7eSLaSO','2024-12-21 00:13:26','2024-12-21 00:13:26',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'adventure_design'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-22 22:58:18
