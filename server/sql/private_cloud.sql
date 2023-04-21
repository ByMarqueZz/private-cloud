-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: private_cloud
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.10.2

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
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `permissions` tinyint(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `shared_by_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `fk_shared` (`shared_by_id`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_shared` FOREIGN KEY (`shared_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,1,'README.md','ByMarqueZz','md',0,NULL,NULL),(2,1,'Mis fotos','ByMarqueZz','folder',1,NULL,NULL),(3,1,'Cosas importantes','ByMarqueZz','folder',0,NULL,NULL),(7,3,'que si marquez','alvaro','folder',1,NULL,NULL),(8,3,'images (1).jpeg','alvaro/que si marquez','jpeg',0,NULL,NULL),(9,1,'labrador.jpeg','ByMarqueZz/Mis fotos','jpeg',1,NULL,NULL),(10,1,'bichon.jpeg','ByMarqueZz/Mis fotos','jpeg',1,NULL,NULL),(13,1,'admin','ByMarqueZz/Cosas importantes','folder',0,'admin',NULL),(22,2,'Compartido','Paco','folder',0,NULL,1),(23,2,'Mis fotos','Paco/Compartido','folder',0,NULL,1),(25,2,'labrador.jpeg','Paco/Compartido/Mis fotos','jpeg',0,NULL,1),(26,2,'bichon.jpeg','Paco/Compartido/Mis fotos','jpeg',0,NULL,1),(28,2,'Fotos de coches','Paco','folder',1,NULL,NULL),(29,2,'Mazda-RX7-62.jpeg','Paco/Fotos de coches','jpeg',1,NULL,NULL),(30,1,'Compartido','ByMarqueZz','folder',0,NULL,2),(31,1,'Fotos de coches','ByMarqueZz/Compartido','folder',0,NULL,2),(32,1,'Mazda-RX7-62.jpeg','ByMarqueZz/Compartido/Fotos de coches','jpeg',0,NULL,2),(42,1,'prueba.txt','ByMarqueZz/Cosas importantes','txt',0,NULL,NULL),(43,1,'Helado dogo.jpeg','ByMarqueZz/Mis fotos','jpeg',0,NULL,NULL),(44,1,'La nena y dogo.jpeg','ByMarqueZz/Mis fotos','jpeg',0,NULL,NULL),(51,4,'Compartido','lxyree','folder',0,NULL,1),(52,4,'Mis fotos','lxyree/Compartido','folder',0,NULL,1),(53,4,'labrador.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(54,4,'bichon.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(55,4,'Helado dogo.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(56,4,'La nena y dogo.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(57,2,'landingPage','Paco','folder',1,NULL,NULL),(58,2,'index.html','Paco/landingPage','html',1,NULL,NULL),(59,1,'index.html','ByMarqueZz/Cosas importantes','html',1,NULL,NULL),(60,2,'index.js','Paco/landingPage','js',1,NULL,NULL);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `follower_id` (`follower_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (5,2,1),(6,1,3);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `icons`
--

DROP TABLE IF EXISTS `icons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `icons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `icons`
--

LOCK TABLES `icons` WRITE;
/*!40000 ALTER TABLE `icons` DISABLE KEYS */;
INSERT INTO `icons` VALUES (1,'folder','folder.png'),(2,'txt','/assets/nota.png'),(3,'md','/assets/markdown.png'),(4,'pdf','/assets/pdf.png'),(5,'docx','/assets/docx.png'),(6,'doc','/assets/docx.png'),(7,'pptx','/assets/pptx.png'),(8,'ppt','/assets/pptx.png'),(9,'xlsx','/assets/xlsx.png'),(10,'xls','/assets/xlsx.png'),(11,'html','/assets/html.png'),(12,'htm','/assets/html.png'),(13,'css','/assets/css.png'),(14,'js','/assets/js.png'),(15,'java','/assets/java.png'),(16,'php','/assets/php.png'),(17,'sass','/assets/sass.png'),(18,'scss','/assets/sass.png'),(19,'json','/assets/json.png'),(20,'ico','/assets/ico.png'),(21,'svg','/assets/svg.png'),(22,'gitignore','/assets/gitignore.png'),(23,'firebase','/assets/firebase.png'),(24,'firebaserc','/assets/firebase.png'),(25,'sql','/assets/sql.png'),(26,'png','/assets/png.png'),(27,'jpg','/assets/png.png'),(28,'jpeg','/assets/png.png'),(29,'zip','/assets/zip.png'),(30,'rar','/assets/rar.png'),(31,'7z','/assets/rar.png'),(32,'mp3','/assets/mp3.png'),(33,'mp4','/assets/mp4.png'),(34,'avi','/assets/avi.png'),(35,'mkv','/assets/mkv.png'),(36,'exe','/assets/exe.png'),(37,'bat','/assets/bat.png'),(38,'py','/assets/py.png'),(39,'c','/assets/c.png'),(40,'cpp','/assets/cpp.png'),(41,'cs','/assets/cs.png'),(42,'go','/assets/go.png'),(43,'rb','/assets/rb.png'),(44,'swift','/assets/swift.png'),(45,'xml','/assets/xml.png'),(46,'yml','/assets/yml.png'),(47,'yaml','/assets/yml.png');
/*!40000 ALTER TABLE `icons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Juan Antonio','Marquez Ruiz','bymarquezz2@gmail.com','123456','ByMarqueZz','$2b$13$CC10rF.CUqFliNhofv9w2.','./uploads/115186741.jpeg','2023-04-10 09:25:32','Futuro Desarrollador web. Estudios realizados en el I.E.S. Francisco Ayala, Granada'),(2,'Paco','Pepe','bymarquezz2@gmail.com','pepe','Paco','$2b$13$i6yUkrNUKLCR2qlDiueCte','./uploads/bichon-1681735023796.jpeg','2023-04-11 08:55:33',NULL),(3,'alvaro','dasda','alvarofdayala@gmail.com','12345','alvaro','$2b$13$1QU4r/KGFlnFZT3YOPiHdu','./assets/perfil.png','2023-04-11 11:28:28',NULL),(4,'Leyre','Escribano','vlogsnme@gmail.com','Quesiquierooquesitengo','lxyree','$2b$13$a92WfiNs3wJKFSuTydELFu','./assets/perfil.png','2023-04-11 14:34:26',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-21  8:28:41
