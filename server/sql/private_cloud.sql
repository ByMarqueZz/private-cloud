-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: private_cloud
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.10.2

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
) ENGINE=InnoDB AUTO_INCREMENT=863;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,1,'README.md','ByMarqueZz','md',0,NULL,NULL),(2,1,'Mis fotos','ByMarqueZz','folder',1,NULL,NULL),(3,1,'Cosas importantes','ByMarqueZz','folder',0,NULL,NULL),(9,1,'labrador.jpeg','ByMarqueZz/Mis fotos','jpeg',1,NULL,NULL),(10,1,'bichon.jpeg','ByMarqueZz/Mis fotos','jpeg',1,NULL,NULL),(22,2,'Compartido','Paco','folder',0,NULL,1),(23,2,'Mis fotos','Paco/Compartido','folder',0,NULL,1),(25,2,'labrador.jpeg','Paco/Compartido/Mis fotos','jpeg',0,NULL,1),(26,2,'bichon.jpeg','Paco/Compartido/Mis fotos','jpeg',0,NULL,1),(28,2,'Fotos de coches','Paco','folder',1,NULL,NULL),(29,2,'Mazda-RX7-62.jpeg','Paco/Fotos de coches','jpeg',1,NULL,NULL),(30,1,'Compartido','ByMarqueZz','folder',0,NULL,2),(31,1,'Fotos de coches','ByMarqueZz/Compartido','folder',0,NULL,2),(32,1,'Mazda-RX7-62.jpeg','ByMarqueZz/Compartido/Fotos de coches','jpeg',0,NULL,2),(43,1,'Helado dogo.jpeg','ByMarqueZz/Mis fotos','jpeg',0,NULL,NULL),(44,1,'La nena y dogo.jpeg','ByMarqueZz/Mis fotos','jpeg',0,NULL,NULL),(51,4,'Compartido','lxyree','folder',0,NULL,1),(52,4,'Mis fotos','lxyree/Compartido','folder',0,'dogo',1),(53,4,'labrador.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(54,4,'bichon.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(55,4,'Helado dogo.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(56,4,'La nena y dogo.jpeg','lxyree/Compartido/Mis fotos','jpeg',0,NULL,1),(57,2,'landingPage','Paco','folder',1,NULL,NULL),(58,2,'index.html','Paco/landingPage','html',1,NULL,NULL),(59,1,'index.html','ByMarqueZz/Cosas importantes','html',1,NULL,NULL),(60,2,'index.js','Paco/landingPage','js',1,NULL,NULL),(62,4,'contraseña.txt','lxyree/Compartido','txt',0,NULL,NULL),(112,2,'README.md','Paco/Compartido','md',0,NULL,1),(113,2,'README.md(1)','Paco/Compartido','md',0,NULL,1),(114,2,'README.md(2)','Paco/Compartido','md',0,NULL,1),(115,2,'README.md(3)','Paco/Compartido','md',0,NULL,1),(116,2,'README.md(4)','Paco/Compartido','md',0,NULL,1),(117,2,'README.md(5)','Paco/Compartido','md',0,NULL,1),(118,2,'README.md(6)','Paco/Compartido','md',0,NULL,1),(119,2,'README.md(7)','Paco/Compartido','md',0,NULL,1),(120,2,'README.md(8)','Paco/Compartido','md',0,NULL,1),(121,2,'README.md(9)','Paco/Compartido','md',0,NULL,1),(195,1,'Proyects','ByMarqueZz','folder',0,NULL,NULL),(196,1,'parking','ByMarqueZz/Proyects','folder',0,NULL,NULL),(213,3,'Compartido','alvaro','folder',0,NULL,1),(328,1,'admin','ByMarqueZz/Cosas importantes','folder',0,'admin',NULL),(334,2,'README.md(10)','Paco/Compartido','md',0,NULL,1),(335,2,'README.md(11)','Paco/Compartido','md',0,NULL,1),(336,2,'README.md(12)','Paco/Compartido','md',0,NULL,1),(337,2,'README.md(13)','Paco/Compartido','md',0,NULL,1),(338,2,'README.md(14)','Paco/Compartido','md',0,NULL,1),(339,2,'README.md(15)','Paco/Compartido','md',0,NULL,1),(340,2,'README.md(16)','Paco/Compartido','md',0,NULL,1),(341,2,'README.md(17)','Paco/Compartido','md',0,NULL,1),(342,2,'README.md(18)','Paco/Compartido','md',0,NULL,1),(343,2,'README.md(19)','Paco/Compartido','md',0,NULL,1),(344,2,'README.md(20)','Paco/Compartido','md',0,NULL,1),(345,2,'README.md(21)','Paco/Compartido','md',0,NULL,1),(346,2,'README.md(22)','Paco/Compartido','md',0,NULL,1),(347,2,'README.md(23)','Paco/Compartido','md',0,NULL,1),(348,2,'README.md(24)','Paco/Compartido','md',0,NULL,1),(349,2,'README.md(25)','Paco/Compartido','md',0,NULL,1),(350,2,'README.md(26)','Paco/Compartido','md',0,NULL,1),(351,2,'README.md(27)','Paco/Compartido','md',0,NULL,1),(352,2,'README.md(28)','Paco/Compartido','md',0,NULL,1),(353,2,'README.md(29)','Paco/Compartido','md',0,NULL,1),(381,2,'README.md(30)','Paco/Compartido','md',0,NULL,1),(508,1,'foto esquema.jpeg','ByMarqueZz/Proyects/parking','jpeg',1,NULL,NULL),(591,1,'export.sql','ByMarqueZz/Proyects/parking','sql',0,NULL,NULL),(592,1,'tablas.pdf','ByMarqueZz/Proyects/parking','pdf',0,NULL,NULL),(593,1,'migrations','ByMarqueZz/Proyects/parking','folder',0,NULL,NULL),(594,1,'2023_05_02_114115_create_auth_item_child_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(595,1,'2023_05_02_114116_create_user_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(596,1,'2023_05_02_114117_create_client_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(597,1,'2023_05_02_114118_create_config_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(598,1,'2023_05_02_114113_create_auth_item_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(599,1,'2023_05_02_114114_create_auth_assignment_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(600,1,'2023_05_02_114120_create_request_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(601,1,'2023_05_02_114112_create_auth_rule_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(602,1,'2023_05_02_114119_create_vehicle_table.php','ByMarqueZz/Proyects/parking/migrations','php',0,NULL,NULL),(603,3,'parking','alvaro/Compartido','folder',0,NULL,1),(604,3,'migrations','alvaro/Compartido/parking','folder',0,NULL,1),(605,3,'export.sql','alvaro/Compartido/parking','sql',0,NULL,1),(606,3,'foto esquema.jpeg','alvaro/Compartido/parking','jpeg',0,NULL,1),(607,3,'tablas.pdf','alvaro/Compartido/parking','pdf',0,NULL,1),(608,3,'2023_05_02_114115_create_auth_item_child_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(609,3,'2023_05_02_114116_create_user_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(610,3,'2023_05_02_114114_create_auth_assignment_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(611,3,'2023_05_02_114120_create_request_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(612,3,'2023_05_02_114112_create_auth_rule_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(613,3,'2023_05_02_114118_create_config_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(614,3,'2023_05_02_114113_create_auth_item_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(615,3,'2023_05_02_114117_create_client_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(616,3,'2023_05_02_114119_create_vehicle_table.php','alvaro/Compartido/parking/migrations','php',0,NULL,1),(619,3,'Central Padel','alvaro','folder',0,NULL,NULL),(620,3,'central-padel.sql','alvaro/Central Padel','sql',1,NULL,NULL),(621,1,'kali.rdp','ByMarqueZz/Cosas importantes/admin','rdp',0,NULL,NULL),(622,1,'src.zip','ByMarqueZz/Proyects','zip',0,NULL,NULL),(623,1,'Trabajo-Fin-De-Grado.zip','ByMarqueZz/Proyects','zip',1,NULL,NULL),(625,1,'archivo.txt','ByMarqueZz/Proyects','txt',0,NULL,NULL),(626,6,'5-10 (1).png','asdasda','png',1,NULL,NULL),(628,6,'5-10 .png','asdasda','png',1,NULL,NULL),(677,2,'archivo.txt','Paco/Compartido','txt',0,NULL,1),(678,2,'Mis fotos(1)','Paco/Compartido','folder',0,NULL,1),(679,2,'bichon.jpeg','Paco/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(680,2,'labrador.jpeg','Paco/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(681,2,'Helado dogo.jpeg','Paco/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(682,2,'La nena y dogo.jpeg','Paco/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(683,2,'README.md(31)','Paco/Compartido','md',0,NULL,1),(684,2,'README.md(32)','Paco/Compartido','md',0,NULL,1),(685,2,'README.md(33)','Paco/Compartido','md',0,NULL,1),(686,2,'README.md(34)','Paco/Compartido','md',0,NULL,1),(687,2,'README.md(35)','Paco/Compartido','md',0,NULL,1),(688,2,'README.md(36)','Paco/Compartido','md',0,NULL,1),(689,2,'README.md(37)','Paco/Compartido','md',0,NULL,1),(690,2,'README.md(38)','Paco/Compartido','md',0,NULL,1),(691,2,'README.md(39)','Paco/Compartido','md',0,NULL,1),(692,2,'README.md(40)','Paco/Compartido','md',0,NULL,1),(693,2,'README.md(41)','Paco/Compartido','md',0,NULL,1),(694,2,'README.md(42)','Paco/Compartido','md',0,NULL,1),(695,2,'README.md(43)','Paco/Compartido','md',0,NULL,1),(696,2,'README.md(44)','Paco/Compartido','md',0,NULL,1),(697,2,'README.md(45)','Paco/Compartido','md',0,NULL,1),(698,2,'README.md(46)','Paco/Compartido','md',0,NULL,1),(699,2,'README.md(47)','Paco/Compartido','md',0,NULL,1),(700,2,'README.md(48)','Paco/Compartido','md',0,NULL,1),(701,2,'README.md(49)','Paco/Compartido','md',0,NULL,1),(702,2,'README.md(50)','Paco/Compartido','md',0,NULL,1),(703,2,'README.md(51)','Paco/Compartido','md',0,NULL,1),(704,2,'README.md(52)','Paco/Compartido','md',0,NULL,1),(705,2,'README.md(53)','Paco/Compartido','md',0,NULL,1),(706,2,'README.md(54)','Paco/Compartido','md',0,NULL,1),(707,2,'README.md(55)','Paco/Compartido','md',0,NULL,1),(708,2,'README.md(56)','Paco/Compartido','md',0,NULL,1),(709,2,'README.md(57)','Paco/Compartido','md',0,NULL,1),(710,2,'README.md(58)','Paco/Compartido','md',0,NULL,1),(754,2,'README.md(59)','Paco/Compartido','md',0,NULL,1),(755,4,'IMG_4521.jpeg','lxyree/Compartido/Mis fotos','jpeg',1,NULL,NULL),(756,1,'javs.txt','ByMarqueZz','txt',0,NULL,NULL),(757,4,'Mis fotos(1)','lxyree/Compartido','folder',0,NULL,1),(758,4,'labrador.jpeg','lxyree/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(759,4,'bichon.jpeg','lxyree/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(760,4,'Helado dogo.jpeg','lxyree/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(761,4,'La nena y dogo.jpeg','lxyree/Compartido/Mis fotos(1)','jpeg',0,NULL,1),(762,7,'Mierdas de pedro','pedro_espigares','folder',1,NULL,NULL),(763,7,'20230524_202433.jpg','pedro_espigares/Mierdas de pedro','jpg',1,NULL,NULL),(764,7,'tusmuertos.html','pedro_espigares/Mierdas de pedro','txt',0,NULL,NULL),(765,1,'Mierdas de pedro','ByMarqueZz/Compartido','folder',0,NULL,7),(766,1,'20230524_202433.jpg','ByMarqueZz/Compartido/Mierdas de pedro','jpg',0,NULL,7),(767,1,'tusmuertos.txt','ByMarqueZz/Compartido/Mierdas de pedro','txt',0,NULL,7),(770,8,'fotosCandy','abenitez','folder',1,NULL,NULL),(771,1,'README.md','ByMarqueZz/Compartido','md',0,NULL,8),(772,8,'README.md','abenitez','md',1,NULL,NULL),(773,8,'perro.jpg','abenitez','jpg',1,NULL,NULL),(774,8,'images.jpg','abenitez/fotosCandy','jpg',1,NULL,NULL),(775,8,'carpeta2','abenitez/fotosCandy','folder',1,NULL,NULL),(776,9,'Compartido','profesora','folder',0,NULL,8),(777,9,'perro.jpg','profesora/Compartido','jpg',1,NULL,8),(778,9,'README.md','profesora','md',1,NULL,NULL),(779,9,'perro.jpg(1)','profesora/Compartido','jpg',0,NULL,8),(781,7,'README.md','pedro_espigares','md',1,NULL,NULL),(782,7,'prueba.js','pedro_espigares/Mierdas de pedro','js',0,NULL,NULL),(783,7,'test.bat','pedro_espigares/Mierdas de pedro','bat',1,NULL,NULL),(787,7,'20230518_134007.jpg','pedro_espigares/Mierdas de pedro','jpg',1,NULL,NULL),(788,7,'Oshi No Ko - CapÃ­tulo 118 Arranque - 7.jpg','pedro_espigares/Mierdas de pedro','jpg',1,NULL,NULL),(794,7,'Ficha Horas.pdf','pedro_espigares/Mierdas de pedro','pdf',0,NULL,NULL),(799,7,'Memoria TÃ©cnica FitVerum.docx','pedro_espigares/Mierdas de pedro','docx',0,NULL,NULL),(800,4,'Mis fotos(2)','lxyree/Compartido','folder',0,NULL,1),(801,4,'bichon.jpeg','lxyree/Compartido/Mis fotos(2)','jpeg',0,NULL,1),(802,4,'labrador.jpeg','lxyree/Compartido/Mis fotos(2)','jpeg',0,NULL,1),(803,4,'Helado dogo.jpeg','lxyree/Compartido/Mis fotos(2)','jpeg',0,NULL,1),(804,4,'La nena y dogo.jpeg','lxyree/Compartido/Mis fotos(2)','jpeg',0,NULL,1),(813,1,'Juan Antonio Marquez Curriculum.pdf','ByMarqueZz/Cosas importantes','pdf',0,NULL,NULL),(828,1,'T','ByMarqueZz/Mis fotos','folder',0,NULL,NULL),(836,1,'perfil.jpg','ByMarqueZz/Mis fotos/T','jpg',0,NULL,NULL),(837,1,'Imagen de WhatsApp 2023-06-14 a las 16.54.33.png','ByMarqueZz/Mis fotos/T','png',0,NULL,NULL),(838,1,'Imagen de WhatsApp 2023-06-14 a las 16s.55.17.png','ByMarqueZz/Mis fotos/T','png',0,NULL,NULL),(839,1,'Imagen de WhatsApp 2023-06-14 a las 16a.55.18.png','ByMarqueZz/Mis fotos/T','png',0,NULL,NULL),(840,1,'Imagen de WhatsApp 2023-06-14 a las 16.56.45.jpg','ByMarqueZz/Mis fotos/T','jpg',0,NULL,NULL),(842,7,'klkconk','pedro_espigares/Mierdas de pedro','folder',1,NULL,NULL),(844,12,'CSS+Grid+Guide.pdf','first','pdf',1,NULL,NULL),(845,12,'primera','first','folder',0,'hola',NULL),(846,12,'hola','first','hola',1,NULL,NULL),(847,12,'hola(1).hola','first','hola',1,NULL,NULL),(850,13,'Carlos','jcarlosjmase','folder',1,NULL,NULL),(851,12,'CSS+Grid+Guide.pdf','first/primera','pdf',1,NULL,NULL),(852,13,'Prueba.txt','jcarlosjmase/Carlos','txt',1,NULL,NULL),(853,1,'hola.txt','ByMarqueZz/Cosas importantes','txt',1,NULL,NULL),(854,7,'Compartido','pedro_espigares','folder',0,NULL,1),(855,7,'hola.txt','pedro_espigares/Compartido','txt',0,NULL,1),(856,13,'16872595861598324770284604177706.jpg','jcarlosjmase/Carlos','jpg',1,NULL,NULL),(857,1,'hola','ByMarqueZz/Proyects','folder',0,'$2b$10$qpqDTS4z22DydcgtCLi5ZuW2sabb6BlDh3hpqM3sedDJIBykz8ByW',NULL),(858,1,'a','ByMarqueZz/Proyects','folder',0,'$2b$10$XhPM6G7/B7xak9QizPuGle2JMJ2cUyz2dSOK3f1FOKQ6ARya8CAkO',NULL),(860,1,'Solicitud DAM.pdf','ByMarqueZz/Cosas importantes','pdf',0,NULL,NULL),(861,1,'Solicitud curso.pdf','ByMarqueZz/Cosas importantes','pdf',0,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (5,2,1),(6,1,3),(9,9,8),(10,9,2),(11,9,4),(12,9,1),(13,7,1),(16,1,7);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frames`
--

DROP TABLE IF EXISTS `frames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level` varchar(255) NOT NULL,
  `style` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frames`
--

LOCK TABLES `frames` WRITE;
/*!40000 ALTER TABLE `frames` DISABLE KEYS */;
INSERT INTO `frames` VALUES (1,'/assets/profile/1-5.png','estilo-marco-1'),(2,'/assets/profile/5-10.png','estilo-marco-2'),(3,'/assets/profile/10-15.png','estilo-marco-3'),(4,'/assets/profile/15-20.png','estilo-marco-2'),(5,'/assets/profile/20-25.png','estilo-marco-2'),(6,'/assets/profile/25-30.png','estilo-marco-2'),(7,'/assets/profile/30-35.png','estilo-marco-4'),(8,'/assets/profile/35-40.png','estilo-marco-5');
/*!40000 ALTER TABLE `frames` ENABLE KEYS */;
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
-- Table structure for table `missions`
--

DROP TABLE IF EXISTS `missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `missions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `frame_id` int NOT NULL,
  `points` int NOT NULL,
  `max_value` int NOT NULL,
  `callback` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `frame_id` (`frame_id`),
  CONSTRAINT `missions_ibfk_1` FOREIGN KEY (`frame_id`) REFERENCES `frames` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,'Sube','Sube tu primer archivo',1,200,1,'upload'),(2,'Crea','Crea una carpeta',1,200,1,'Carpeta creada'),(3,'Comparte','Comparte un archivo o carpeta con otro usuario',1,200,1,'Compartido'),(4,'Edita','Cambia tu imagen de perfil',1,200,1,'Foto de perfil actualizada'),(5,'Sube','Sube 10 archivos',2,200,10,'upload2'),(6,'Crea','Crea 5 carpetas',2,200,5,'Carpeta creada2'),(7,'Comparte','Comparte 5 archivos o carpetas con otros usuarios',2,200,5,'Compartido2'),(8,'Edita','Cambia la configuración de privacidad de 5 archivos o carpetas',2,200,5,'Carpeta Editada2'),(9,'Crea','Crea 5 archivos desde 0',2,200,5,'Archivo creado2'),(10,'Sube','Sube 50 archivos',3,200,50,'upload3'),(11,'Crea','Crea 10 carpetas con contraseñas',3,200,10,'Carpeta con contraseña creada3'),(12,'Comparte','Comparte 10 archivos o carpetas con otros usuarios',3,200,10,'Compartido3'),(13,'Edita','Cambia la configuración de privacidad de 10 archivos o carpetas',3,200,10,'Carpeta Editada3'),(14,'Crea','Crea 10 archivos desde 0',3,200,10,'Archivo creado3'),(15,'Sube','Sube 75 archivos',4,200,75,'upload4'),(16,'Crea','Crea 15 carpetas con contraseñas',4,200,15,'Carpeta con contraseña creada4'),(17,'Comparte','Comparte 20 archivos o carpetas con otros usuarios',4,200,20,'Compartido4'),(18,'Edita','Cambia la configuración de privacidad de 20 archivos o carpetas',4,200,20,'Carpeta Editada4'),(19,'Crea','Crea 20 archivos desde 0',4,200,20,'Archivo creado4'),(20,'Sube','Sube 100 archivos',5,200,100,'upload5'),(21,'Crea','Crea 30 carpetas con contraseñas',5,200,30,'Carpeta con contraseña creada5'),(22,'Comparte','Comparte 30 archivos o carpetas con otros usuarios',5,200,30,'Compartido5'),(23,'Edita','Cambia la configuración de privacidad de 30 archivos o carpetas',5,200,30,'Carpeta Editada5'),(24,'Crea','Crea 20 archivos desde 0',5,200,20,'Archivo creado5'),(25,'Sube','Sube 150 archivos',6,200,150,'upload6'),(26,'Crea','Crea 50 carpetas con contraseñas',6,200,50,'Carpeta con contraseña creada6'),(27,'Comparte','Comparte 50 archivos o carpetas con otros usuarios',6,200,50,'Compartido6'),(28,'Edita','Cambia la configuración de privacidad de 50 archivos o carpetas',6,200,50,'Carpeta Editada6'),(29,'Crea','Crea 50 archivos desde 0',6,200,50,'Archivo creado6'),(30,'Sube','Sube 200 archivos',7,200,200,'upload7'),(31,'Crea','Crea 100 carpetas con contraseñas',7,200,100,'Carpeta con contraseña creada7'),(32,'Comparte','Comparte 100 archivos o carpetas con otros usuarios',7,200,100,'Compartido7'),(33,'Edita','Cambia la configuración de privacidad de 100 archivos o carpetas',7,200,100,'Carpeta Editada7'),(34,'Crea','Crea 100 archivos desde 0',7,200,100,'Archivo creado7'),(35,'Sube','Sube 300 archivos',8,200,300,'upload8'),(36,'Crea','Crea 200 carpetas con contraseñas',8,200,200,'Carpeta con contraseña creada8'),(37,'Comparte','Comparte 200 archivos o carpetas con otros usuarios',8,200,200,'Compartido8'),(38,'Edita','Cambia la configuración de privacidad de 200 archivos o carpetas',8,200,200,'Carpeta Editada8'),(39,'Crea','Crea 200 archivos desde 0',8,200,200,'Archivo creado8');
/*!40000 ALTER TABLE `missions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `do` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=794;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (1,1,'upload'),(2,1,'upload'),(3,1,'Carpeta creada'),(4,1,'Foto de perfil actualizada'),(5,1,'Compartido'),(6,1,'Carpeta creada2'),(7,1,'upload2'),(8,1,'upload2'),(9,1,'upload2'),(10,1,'Archivo creado22'),(11,1,'Archivo creado2'),(12,1,'Archivo creado2'),(13,1,'Archivo creado2'),(14,1,'Archivo creado2'),(15,1,'Archivo creado2'),(16,1,'upload2'),(17,1,'upload2'),(18,1,'upload2'),(19,1,'upload2'),(20,1,'upload2'),(21,1,'upload2'),(22,1,'upload2'),(23,1,'Carpeta creada2'),(24,1,'Carpeta creada2'),(25,1,'Carpeta creada2'),(26,1,'Carpeta creada2'),(27,1,'Carpeta Editada2'),(28,1,'Carpeta Editada2'),(29,1,'Carpeta Editada2'),(30,1,'Carpeta Editada2'),(31,1,'Carpeta Editada2'),(32,1,'Carpeta Editada2'),(33,1,'Compartido2'),(34,1,'Compartido2'),(35,1,'Compartido2'),(36,1,'Compartido2'),(37,1,'Compartido2'),(38,1,'Archivo creado3'),(39,1,'Archivo creado3'),(40,1,'Carpeta creada3'),(41,1,'Archivo creado3'),(42,1,'Archivo creado3'),(43,1,'Archivo creado3'),(44,1,'Archivo creado3'),(45,1,'Archivo creado3'),(46,1,'Archivo creado3'),(47,1,'Archivo creado3'),(48,1,'Archivo creado3'),(49,1,'Carpeta Editada3'),(50,1,'Carpeta Editada3'),(51,1,'Carpeta Editada3'),(52,1,'Carpeta Editada3'),(53,1,'Carpeta Editada3'),(54,1,'Carpeta Editada3'),(55,1,'Carpeta Editada3'),(56,1,'Carpeta Editada3'),(57,1,'Carpeta Editada3'),(58,1,'Carpeta Editada3'),(59,1,'Carpeta con contraseña creada3'),(60,1,'Carpeta con contraseña creada3'),(61,1,'Carpeta con contraseña creada3'),(62,1,'Carpeta con contraseña creada3'),(63,1,'Carpeta con contraseña creada3'),(64,1,'Carpeta con contraseña creada3'),(65,1,'Carpeta con contraseña creada3'),(66,1,'Carpeta con contraseña creada3'),(67,1,'Carpeta con contraseña creada3'),(68,1,'Carpeta con contraseña creada3'),(69,1,'Compartido3'),(70,1,'Compartido3'),(71,1,'Compartido3'),(72,1,'Compartido3'),(73,1,'Compartido3'),(74,1,'Compartido3'),(75,1,'Compartido3'),(76,1,'Compartido3'),(77,1,'Compartido3'),(78,1,'Compartido3'),(79,1,'Carpeta creada3'),(80,1,'upload3'),(81,1,'upload3'),(82,1,'upload3'),(83,1,'upload3'),(84,1,'upload3'),(85,1,'upload3'),(86,1,'upload3'),(87,1,'upload3'),(88,1,'upload3'),(89,1,'upload3'),(90,1,'Carpeta creada3'),(91,1,'upload3'),(92,1,'upload3'),(93,1,'upload3'),(94,1,'upload3'),(95,1,'upload3'),(96,1,'upload3'),(97,1,'upload3'),(98,1,'upload3'),(99,1,'upload3'),(100,1,'upload3'),(101,1,'upload3'),(102,1,'upload3'),(103,1,'upload3'),(104,1,'upload3'),(105,1,'upload3'),(106,1,'upload3'),(107,1,'upload3'),(108,1,'upload3'),(109,1,'upload3'),(110,1,'upload3'),(111,1,'upload3'),(112,1,'upload3'),(113,1,'upload3'),(114,1,'upload3'),(115,1,'upload3'),(116,1,'upload3'),(117,1,'upload3'),(118,1,'upload3'),(119,1,'upload3'),(120,1,'upload3'),(121,1,'upload3'),(122,1,'upload3'),(123,1,'upload3'),(124,1,'upload3'),(125,1,'upload3'),(126,1,'upload3'),(127,1,'upload3'),(128,1,'upload3'),(129,1,'upload3'),(130,1,'upload3'),(131,1,'upload3'),(132,1,'upload3'),(133,1,'upload3'),(134,1,'upload3'),(135,1,'upload3'),(136,1,'upload3'),(137,1,'upload3'),(138,1,'upload3'),(139,1,'Carpeta creada4'),(140,1,'Carpeta creada4'),(141,1,'Carpeta creada4'),(142,1,'Carpeta creada4'),(143,1,'Carpeta creada4'),(144,1,'Carpeta creada4'),(145,1,'Carpeta creada4'),(146,1,'Carpeta creada4'),(147,1,'Carpeta creada4'),(148,1,'Carpeta creada4'),(149,1,'Carpeta creada4'),(150,1,'Carpeta creada4'),(151,1,'upload4'),(152,1,'Carpeta creada4'),(153,1,'Carpeta creada4'),(154,1,'Carpeta creada4'),(155,1,'upload4'),(156,1,'upload4'),(157,1,'upload4'),(158,1,'upload4'),(159,1,'upload4'),(160,1,'upload4'),(161,1,'upload4'),(162,1,'upload4'),(163,1,'upload4'),(164,1,'upload4'),(165,1,'upload4'),(166,1,'upload4'),(167,1,'upload4'),(168,1,'upload4'),(169,1,'upload4'),(170,1,'Carpeta creada4'),(171,1,'upload4'),(172,1,'upload4'),(173,1,'upload4'),(174,1,'upload4'),(175,1,'upload4'),(176,1,'upload4'),(177,1,'Carpeta creada4'),(178,1,'upload4'),(179,1,'upload4'),(180,1,'upload4'),(181,1,'upload4'),(182,1,'upload4'),(183,1,'Carpeta creada4'),(184,1,'Carpeta creada4'),(185,1,'Carpeta creada4'),(186,1,'Carpeta creada4'),(187,1,'Carpeta con contraseña creada4'),(188,1,'Carpeta con contraseña creada4'),(189,1,'Carpeta creada4'),(190,1,'Carpeta con contraseña creada4'),(191,1,'Carpeta creada4'),(192,1,'Carpeta con contraseña creada4'),(193,1,'Carpeta creada4'),(194,1,'Carpeta con contraseña creada4'),(195,1,'Carpeta creada4'),(196,1,'Carpeta con contraseña creada4'),(197,1,'Carpeta con contraseña creada4'),(198,1,'Carpeta con contraseña creada4'),(199,1,'Carpeta con contraseña creada4'),(200,1,'Carpeta con contraseña creada4'),(201,1,'Carpeta con contraseña creada4'),(202,1,'Carpeta con contraseña creada4'),(203,1,'Carpeta con contraseña creada4'),(204,1,'Carpeta con contraseña creada4'),(205,1,'Carpeta con contraseña creada4'),(206,1,'upload4'),(207,1,'upload4'),(208,1,'upload4'),(209,1,'upload4'),(210,1,'upload4'),(211,1,'upload4'),(212,1,'upload4'),(213,1,'upload4'),(214,1,'upload4'),(215,1,'upload4'),(216,1,'upload4'),(217,1,'upload4'),(218,1,'upload4'),(219,1,'upload4'),(220,1,'upload4'),(221,1,'upload4'),(222,1,'upload4'),(223,1,'upload4'),(224,1,'upload4'),(225,1,'upload4'),(226,1,'upload4'),(227,1,'upload4'),(228,1,'upload4'),(229,1,'upload4'),(230,1,'upload4'),(231,1,'upload4'),(232,1,'upload4'),(233,1,'upload4'),(234,1,'upload4'),(235,1,'upload4'),(236,1,'upload4'),(237,1,'upload4'),(238,1,'upload4'),(239,1,'upload4'),(240,1,'upload4'),(241,1,'upload4'),(242,1,'upload4'),(243,1,'upload4'),(244,1,'upload4'),(245,1,'upload4'),(246,1,'upload4'),(247,1,'upload4'),(248,1,'upload4'),(249,1,'upload4'),(250,1,'upload4'),(251,1,'upload4'),(252,1,'upload4'),(253,1,'upload4'),(254,1,'upload4'),(255,1,'upload4'),(256,1,'upload4'),(257,1,'upload4'),(258,1,'upload4'),(259,1,'upload4'),(260,1,'upload4'),(261,1,'upload4'),(262,1,'upload4'),(263,1,'upload4'),(264,1,'upload4'),(265,1,'upload4'),(266,1,'upload4'),(267,1,'upload4'),(268,1,'Carpeta con contraseña creada4'),(269,1,'Carpeta creada4'),(270,1,'upload4'),(271,1,'upload4'),(272,1,'upload4'),(273,1,'Carpeta creada4'),(274,1,'Compartido4'),(275,1,'Compartido4'),(276,1,'Compartido4'),(277,1,'Compartido4'),(278,1,'Compartido4'),(279,1,'Compartido4'),(280,1,'Compartido4'),(281,1,'Compartido4'),(282,1,'Compartido4'),(283,1,'Compartido4'),(284,1,'Compartido4'),(285,1,'Compartido4'),(286,1,'Compartido4'),(287,1,'Compartido4'),(288,1,'Compartido4'),(289,1,'Compartido4'),(290,1,'Compartido4'),(291,1,'Compartido4'),(292,1,'Compartido4'),(293,1,'Compartido4'),(294,1,'Carpeta creada4'),(295,1,'Archivo creado4'),(296,1,'Archivo creado4'),(297,1,'Archivo creado4'),(298,1,'Archivo creado4'),(299,1,'Archivo creado4'),(300,1,'Archivo creado4'),(301,1,'Archivo creado4'),(302,1,'Archivo creado4'),(303,1,'Archivo creado4'),(304,1,'Archivo creado4'),(305,1,'Archivo creado4'),(306,1,'Archivo creado4'),(307,1,'Archivo creado4'),(308,1,'Archivo creado4'),(309,1,'Archivo creado4'),(310,1,'Archivo creado4'),(311,1,'Archivo creado4'),(312,1,'Archivo creado4'),(313,1,'Archivo creado4'),(314,1,'Archivo creado4'),(315,1,'Carpeta Editada4'),(316,1,'Carpeta Editada4'),(317,1,'Carpeta Editada4'),(318,1,'Carpeta Editada4'),(319,1,'Carpeta Editada4'),(320,1,'Carpeta Editada4'),(321,1,'Carpeta Editada4'),(322,1,'Carpeta Editada4'),(323,1,'Carpeta Editada4'),(324,1,'Carpeta Editada4'),(325,1,'Carpeta Editada4'),(326,1,'Carpeta Editada4'),(327,1,'Carpeta Editada4'),(328,1,'Carpeta Editada4'),(329,1,'Carpeta Editada4'),(330,1,'Carpeta Editada4'),(331,1,'Carpeta Editada4'),(332,1,'Carpeta Editada4'),(333,1,'Carpeta Editada4'),(334,1,'Carpeta Editada4'),(336,1,'upload5'),(337,1,'Carpeta creada5'),(338,1,'upload5'),(339,1,'upload5'),(340,1,'upload5'),(341,1,'upload5'),(342,1,'upload5'),(343,1,'upload5'),(344,1,'upload5'),(345,1,'upload5'),(346,1,'upload5'),(347,1,'upload5'),(348,1,'upload5'),(349,1,'upload5'),(350,1,'upload5'),(351,1,'upload5'),(352,1,'upload5'),(353,3,'upload'),(354,3,'upload'),(355,3,'upload'),(356,3,'upload'),(357,3,'upload'),(358,3,'upload'),(359,3,'upload'),(360,3,'upload'),(361,3,'upload'),(362,1,'upload5'),(363,1,'upload5'),(364,1,'upload5'),(365,1,'upload5'),(366,1,'upload5'),(367,1,'upload5'),(368,1,'upload5'),(369,1,'upload5'),(370,1,'upload5'),(371,1,'Carpeta Editada5'),(372,1,'Carpeta creada5'),(373,1,'upload5'),(374,1,'upload5'),(375,1,'upload5'),(376,1,'upload5'),(377,1,'upload5'),(378,1,'upload5'),(379,1,'upload5'),(380,1,'upload5'),(381,1,'upload5'),(382,1,'upload5'),(383,1,'upload5'),(384,1,'upload5'),(385,1,'upload5'),(386,1,'upload5'),(387,1,'upload5'),(388,1,'upload5'),(389,1,'upload5'),(390,1,'upload5'),(391,1,'upload5'),(392,1,'upload5'),(393,1,'upload5'),(394,1,'upload5'),(395,1,'upload5'),(396,1,'upload5'),(397,1,'upload5'),(398,1,'upload5'),(399,1,'upload5'),(400,1,'upload5'),(401,1,'upload5'),(402,1,'upload5'),(403,1,'upload5'),(404,1,'upload5'),(405,1,'upload5'),(406,1,'upload5'),(407,1,'upload5'),(408,1,'upload5'),(409,1,'upload5'),(410,1,'upload5'),(411,1,'upload5'),(412,1,'upload5'),(413,1,'upload5'),(414,1,'upload5'),(415,1,'upload5'),(416,1,'upload5'),(417,1,'upload5'),(418,1,'upload5'),(419,1,'upload5'),(420,1,'upload5'),(421,1,'upload5'),(422,1,'upload5'),(423,1,'upload5'),(424,1,'upload5'),(425,1,'upload5'),(426,1,'upload5'),(427,1,'upload5'),(428,1,'upload5'),(429,1,'upload5'),(430,1,'upload5'),(431,1,'upload5'),(432,1,'upload5'),(433,1,'upload5'),(434,1,'upload5'),(435,1,'upload5'),(436,1,'upload5'),(437,1,'upload5'),(438,1,'upload5'),(439,1,'upload5'),(440,1,'upload5'),(441,1,'upload5'),(442,1,'upload5'),(443,1,'upload5'),(444,1,'upload5'),(445,1,'upload5'),(446,1,'upload5'),(447,1,'upload5'),(448,1,'upload5'),(449,1,'upload5'),(450,1,'upload5'),(451,1,'upload5'),(452,1,'upload5'),(453,1,'upload5'),(454,1,'Carpeta Editada5'),(455,1,'Carpeta Editada5'),(456,1,'upload5'),(457,1,'Carpeta Editada5'),(458,1,'Carpeta creada5'),(459,1,'Carpeta Editada5'),(460,1,'upload5'),(461,1,'upload5'),(462,1,'upload5'),(463,1,'upload5'),(464,1,'upload5'),(465,1,'upload5'),(466,1,'Carpeta creada5'),(467,1,'upload5'),(468,1,'upload5'),(469,1,'upload5'),(470,1,'upload5'),(471,1,'Carpeta creada5'),(472,1,'upload5'),(473,1,'upload5'),(474,1,'upload5'),(475,1,'upload5'),(476,1,'upload5'),(477,1,'upload5'),(478,1,'upload5'),(479,1,'upload5'),(480,1,'Carpeta Editada5'),(481,1,'upload5'),(482,1,'upload5'),(483,3,'upload'),(484,3,'upload'),(485,3,'upload'),(486,3,'upload'),(487,3,'upload'),(488,3,'upload'),(489,3,'upload'),(490,3,'upload'),(491,3,'upload'),(492,3,'upload'),(493,3,'upload'),(494,3,'upload'),(495,3,'upload'),(496,3,'upload'),(497,3,'upload'),(498,3,'upload'),(499,3,'upload'),(500,3,'upload'),(501,3,'upload'),(502,3,'upload'),(503,3,'upload'),(504,3,'upload'),(505,3,'upload'),(506,3,'upload'),(507,3,'upload'),(508,3,'upload'),(509,3,'upload'),(510,3,'upload'),(511,3,'upload'),(512,3,'upload'),(513,1,'upload5'),(514,1,'upload5'),(515,1,'Carpeta creada5'),(516,1,'upload5'),(517,1,'upload5'),(518,1,'upload5'),(519,1,'upload5'),(520,1,'upload5'),(521,1,'upload5'),(522,1,'upload5'),(523,1,'upload5'),(524,1,'upload5'),(525,1,'Carpeta con contraseña creada5'),(526,3,'Carpeta creada'),(527,3,'Carpeta creada'),(528,3,'upload'),(529,1,'upload5'),(530,1,'upload5'),(531,1,'upload5'),(532,1,'Carpeta con contraseña creada5'),(533,1,'Archivo creado5'),(534,6,'upload'),(535,6,'upload'),(536,6,'upload'),(537,1,'Carpeta Editada5'),(538,1,'Carpeta Editada5'),(539,1,'Archivo creado5'),(540,1,'Carpeta Editada5'),(541,1,'Carpeta Editada5'),(542,1,'Carpeta Editada5'),(543,1,'Carpeta Editada5'),(544,1,'Carpeta Editada5'),(545,1,'Carpeta Editada5'),(546,1,'Carpeta Editada5'),(547,1,'Carpeta Editada5'),(548,1,'Carpeta Editada5'),(549,1,'Carpeta Editada5'),(550,1,'Carpeta Editada5'),(551,1,'Carpeta Editada5'),(552,1,'Carpeta Editada5'),(553,1,'Carpeta Editada5'),(554,1,'Carpeta Editada5'),(555,1,'Carpeta Editada5'),(556,1,'Carpeta Editada5'),(557,1,'Carpeta Editada5'),(558,1,'Carpeta Editada5'),(559,1,'Carpeta Editada5'),(560,1,'Carpeta Editada5'),(561,1,'Carpeta Editada5'),(562,1,'Carpeta con contraseña creada5'),(563,1,'Carpeta con contraseña creada5'),(564,1,'Carpeta con contraseña creada5'),(565,1,'Carpeta con contraseña creada5'),(566,1,'Carpeta con contraseña creada5'),(567,1,'Carpeta con contraseña creada5'),(568,1,'Carpeta con contraseña creada5'),(569,1,'Carpeta con contraseña creada5'),(570,1,'Carpeta con contraseña creada5'),(571,1,'Carpeta con contraseña creada5'),(572,1,'Carpeta con contraseña creada5'),(573,1,'Carpeta con contraseña creada5'),(574,1,'Carpeta con contraseña creada5'),(575,1,'Carpeta con contraseña creada5'),(576,1,'Carpeta con contraseña creada5'),(577,1,'Carpeta con contraseña creada5'),(578,1,'Carpeta con contraseña creada5'),(579,1,'Carpeta con contraseña creada5'),(580,1,'Carpeta con contraseña creada5'),(581,1,'Carpeta con contraseña creada5'),(582,1,'Carpeta con contraseña creada5'),(583,1,'Carpeta con contraseña creada5'),(584,1,'Carpeta con contraseña creada5'),(585,1,'Carpeta con contraseña creada5'),(586,1,'Carpeta con contraseña creada5'),(587,1,'Carpeta con contraseña creada5'),(588,1,'Carpeta con contraseña creada5'),(589,1,'Carpeta con contraseña creada5'),(590,1,'Archivo creado5'),(591,1,'Archivo creado5'),(592,1,'Archivo creado5'),(593,1,'Archivo creado5'),(594,1,'Archivo creado5'),(595,1,'Archivo creado5'),(596,1,'Archivo creado5'),(597,1,'Archivo creado5'),(598,1,'Carpeta creada5'),(599,1,'Archivo creado5'),(600,1,'Archivo creado5'),(601,1,'Archivo creado5'),(602,1,'Archivo creado5'),(603,1,'Archivo creado5'),(604,1,'Archivo creado5'),(605,1,'Archivo creado5'),(606,1,'Archivo creado5'),(607,1,'Archivo creado5'),(608,1,'Archivo creado5'),(638,1,'Carpeta creada6'),(639,1,'upload6'),(640,1,'upload6'),(641,1,'upload6'),(642,1,'upload6'),(643,1,'upload6'),(644,1,'upload6'),(645,1,'upload6'),(646,1,'upload6'),(647,1,'upload6'),(648,1,'upload6'),(649,1,'upload6'),(650,1,'upload6'),(651,1,'upload6'),(652,1,'upload6'),(653,1,'upload6'),(654,1,'upload6'),(655,1,'upload6'),(656,1,'upload6'),(657,1,'upload6'),(658,1,'upload6'),(659,1,'upload6'),(660,1,'upload6'),(661,1,'upload6'),(662,1,'upload6'),(663,1,'upload6'),(664,1,'upload6'),(665,1,'upload6'),(666,1,'upload6'),(667,1,'upload6'),(668,1,'upload6'),(669,1,'upload6'),(670,1,'upload6'),(671,1,'upload6'),(672,1,'upload6'),(673,1,'upload6'),(674,1,'upload6'),(675,1,'upload6'),(676,1,'upload6'),(677,1,'upload6'),(678,1,'upload6'),(679,1,'upload6'),(680,1,'upload6'),(681,1,'Compartido5'),(682,4,'upload'),(683,1,'Archivo creado5'),(684,1,'Foto de perfil actualizada5'),(685,1,'Foto de perfil actualizada5'),(686,1,'Foto de perfil actualizada5'),(687,7,'Carpeta creada'),(688,7,'upload'),(689,7,'Archivo creado'),(690,8,'Foto de perfil actualizada'),(691,8,'Archivo creado'),(692,8,'Archivo creado'),(693,8,'Carpeta creada'),(694,8,'Carpeta Editada'),(695,8,'Compartido'),(696,8,'upload'),(697,8,'upload2'),(698,8,'upload2'),(699,8,'Carpeta creada2'),(700,9,'Foto de perfil actualizada'),(701,8,'Compartido2'),(702,9,'upload'),(703,9,'Carpeta Editada'),(704,8,'Compartido2'),(705,1,'Carpeta Editada5'),(706,7,'Archivo creado'),(707,7,'Foto de perfil actualizada'),(708,7,'Archivo creado'),(709,7,'Archivo creado'),(710,7,'Carpeta Editada'),(711,7,'Carpeta Editada'),(712,7,'upload'),(713,7,'Carpeta Editada'),(714,7,'Carpeta Editada'),(715,7,'Carpeta Editada'),(716,7,'Archivo creado'),(717,7,'Compartido'),(718,7,'Archivo creado2'),(719,7,'upload2'),(720,7,'upload2'),(721,7,'Archivo creado2'),(722,7,'upload2'),(723,7,'upload2'),(724,7,'upload2'),(725,7,'upload2'),(726,7,'upload2'),(727,1,'Archivo creado5'),(728,1,'Archivo creado5'),(729,1,'upload5'),(730,1,'upload5'),(731,7,'upload2'),(732,1,'upload5'),(733,1,'upload5'),(734,1,'upload5'),(735,1,'upload5'),(736,1,'upload5'),(737,1,'upload5'),(738,1,'upload5'),(739,1,'upload5'),(740,1,'Carpeta Editada5'),(741,1,'upload5'),(742,1,'upload5'),(743,1,'Carpeta creada5'),(744,1,'Carpeta creada5'),(745,1,'upload5'),(746,1,'upload5'),(747,1,'upload5'),(748,1,'upload5'),(749,1,'upload5'),(750,1,'upload5'),(751,1,'upload5'),(752,1,'upload5'),(753,1,'upload5'),(754,1,'upload5'),(755,1,'upload5'),(756,1,'Carpeta creada5'),(757,1,'upload5'),(758,1,'upload5'),(759,1,'upload5'),(760,1,'upload5'),(761,1,'upload5'),(762,1,'upload5'),(763,1,'upload5'),(764,1,'upload5'),(765,1,'upload5'),(766,1,'upload5'),(767,1,'upload5'),(768,1,'upload5'),(769,1,'Archivo creado5'),(770,7,'Carpeta creada2'),(771,1,'upload5'),(772,12,'upload'),(773,12,'Carpeta creada'),(774,12,'Carpeta Editada'),(775,12,'Archivo creado'),(776,12,'Archivo creado'),(777,1,'upload5'),(778,1,'upload5'),(779,13,'Carpeta creada'),(780,12,'upload'),(781,13,'Archivo creado'),(782,1,'Archivo creado5'),(783,12,'Carpeta Editada'),(784,1,'Compartido5'),(785,13,'upload'),(786,1,'Carpeta con contraseña creada5'),(787,1,'Carpeta con contraseña creada5'),(788,1,'upload5'),(789,1,'upload5'),(790,1,'Carpeta Editada5'),(791,1,'upload5'),(792,1,'Carpeta Editada5'),(793,1,'upload5');
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
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
  `level` int DEFAULT '0',
  `points` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Juan Antonio','Marquez Ruiz','bymarquezz2@gmail.com','123456','ByMarqueZz','$2b$13$CC10rF.CUqFliNhofv9w2.','./uploads/115186741-1685090983880.jpeg','2023-04-10 09:25:32','Futuro Desarrollador web. Estudios realizados en el I.E.S. Francisco Ayala, Granada',24,3600),(2,'Paco','Pepe','bymarquezz2@gmail.com','pepe','Paco','$2b$13$i6yUkrNUKLCR2qlDiueCte','./uploads/bichon-1681735023796.jpeg','2023-04-11 08:55:33',NULL,1,0),(3,'alvaro','dasda','alvarofdayala@gmail.com','12345','alvaro','$2b$13$1QU4r/KGFlnFZT3YOPiHdu','./assets/perfil.png','2023-04-11 11:28:28',NULL,3,400),(4,'Leyre','Escribano','vlogsnme@gmail.com','Quesiquierooquesitengo','lxyree','$2b$13$a92WfiNs3wJKFSuTydELFu','./assets/perfil.png','2023-04-11 14:34:26',NULL,2,200),(6,'asdad','adada','redbullcaca@gmail.com','123123131','asdasda','$2b$13$lBPKciqn5u7LVvIX9iB47e','./assets/perfil.png','2023-05-22 09:25:26',NULL,2,200),(7,'Pedro','Espigares Asenjo','pedritoesp04@gmail.com','Correo1234$','pedro_espigares','$2b$13$WczsTkVHXHrwboFQ8GZdWe','./uploads/-y8upfw-1685352514057.jpg','2023-05-26 21:29:25',NULL,5,800),(8,'Alicia','Benitez Yáñez','aliciabenitezdocencia@gmail.com','holacaracola','abenitez','$2b$13$lbDfqnUxS6.S6uS4/w29y.','./uploads/IMG_20190824_203536-1685184833470.JPG','2023-05-27 10:48:52',NULL,5,800),(9,'Alicia','Benitez Yáñez','aliciabenitezdocencia@gmail.com','holacaracola','profesora','$2b$13$7.gy6.JA7ovMp5wkvzsni.','./uploads/profesora-1685186516548.jpg','2023-05-27 11:16:49',NULL,3,400),(10,'Eduardo ','Moreno','eduardomorenoalgaba@gmail.com','@eduardo2004','Eledu','$2b$13$v8sbNUkkVVU.V9tTrWNtku','./assets/perfil.png','2023-06-11 14:50:16',NULL,1,0),(11,'cristiano','ronaldo','cr7suuu@gmail.com','aaaa','cr7enlacasa','$2b$13$MegpM80ZTFxcDtHsxusiz.','./assets/perfil.png','2023-06-18 21:24:46',NULL,1,0),(12,'first','lady','pqmlnalv@gmail.com','1234Usuario','first','$2b$13$oovu9XG2ueu021Am/8XNUO','./assets/perfil.png','2023-06-19 17:47:30',NULL,3,400),(13,'Juan Carlos ','Jiménez ','jcarlosjmase@gmail.com','Abc123456.','jcarlosjmase','$2b$13$8ui/e9YqGi.UAny4J1W5Qu','./assets/perfil.png','2023-06-20 11:11:01',NULL,3,400);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_passed_missions`
--

DROP TABLE IF EXISTS `users_passed_missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_passed_missions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `mission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `mission_id` (`mission_id`),
  CONSTRAINT `users_passed_missions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_passed_missions_ibfk_2` FOREIGN KEY (`mission_id`) REFERENCES `missions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_passed_missions`
--

LOCK TABLES `users_passed_missions` WRITE;
/*!40000 ALTER TABLE `users_passed_missions` DISABLE KEYS */;
INSERT INTO `users_passed_missions` VALUES (1,1,1),(2,1,2),(3,1,4),(4,1,3),(5,1,9),(6,1,5),(7,1,5),(8,1,6),(9,1,8),(10,1,7),(11,1,14),(12,1,13),(13,1,11),(14,1,12),(15,1,10),(16,1,10),(17,1,10),(18,1,10),(19,1,10),(20,1,10),(21,1,10),(22,1,10),(23,1,10),(24,1,10),(25,1,10),(26,1,10),(27,1,10),(28,1,10),(29,1,10),(30,1,10),(31,1,10),(32,1,10),(33,1,10),(34,1,10),(35,1,10),(36,1,10),(37,1,10),(38,1,10),(39,1,10),(40,1,10),(41,1,10),(42,1,10),(43,1,10),(44,1,10),(45,1,10),(46,1,10),(47,1,10),(48,1,10),(49,1,10),(50,1,10),(51,1,10),(52,1,10),(53,1,10),(54,1,10),(55,1,10),(56,1,10),(57,1,10),(58,1,10),(59,1,10),(60,1,10),(61,1,10),(62,1,16),(63,1,15),(64,1,15),(65,1,15),(66,1,15),(67,1,15),(68,1,15),(69,1,15),(70,1,15),(71,1,15),(72,1,15),(73,1,15),(74,1,15),(75,1,15),(76,1,15),(77,1,15),(78,1,15),(79,1,15),(80,1,15),(81,1,15),(82,1,15),(83,1,15),(84,1,15),(85,1,15),(86,1,15),(87,1,15),(88,1,15),(89,1,15),(90,1,15),(91,1,15),(92,1,15),(93,1,15),(94,1,15),(95,1,15),(96,1,15),(97,1,15),(98,1,15),(99,1,15),(100,1,15),(101,1,15),(102,1,15),(103,1,15),(104,1,15),(105,1,15),(106,1,15),(107,1,15),(108,1,15),(109,1,15),(110,1,15),(111,1,15),(112,1,15),(113,1,15),(114,1,15),(115,1,15),(116,1,15),(117,1,15),(118,1,15),(119,1,15),(120,1,15),(121,1,15),(122,1,15),(123,1,15),(124,1,17),(125,1,19),(126,1,18),(127,3,1),(128,1,20),(129,3,2),(130,6,1),(131,1,23),(132,1,21),(133,1,24),(134,1,22),(135,4,1),(136,7,2),(137,7,1),(138,8,4),(139,8,2),(140,8,3),(141,8,1),(142,9,4),(143,9,1),(144,7,4),(145,7,3),(146,12,1),(147,12,2),(148,13,2),(149,13,1);
/*!40000 ALTER TABLE `users_passed_missions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 18:20:01
