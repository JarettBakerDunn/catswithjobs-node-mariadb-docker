-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cats_with_jobs
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-1:10.3.34+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cat`
--
use cats_with_jobs;

DROP TABLE IF EXISTS `cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cat` (
  `catID` int(11) NOT NULL,
  `catName` varchar(32) NOT NULL,
  `catPalletteName` varchar(32) NOT NULL,
  `catHat` varchar(32) DEFAULT NULL,
  `catShirt` varchar(32) DEFAULT NULL,
  `catPants` varchar(32) DEFAULT NULL,
  `catShoes` varchar(32) DEFAULT NULL,
  `catPolaroidBG` varchar(32) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`catID`),
  KEY `userID` (`userID`),
  CONSTRAINT `cat_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat`
--

LOCK TABLES `cat` WRITE;
/*!40000 ALTER TABLE `cat` DISABLE KEYS */;
INSERT INTO `cat` VALUES (1,'testCat','catanimated2-lime','hat1','shirt1','pants1','shoes1','scenery3',1),(2,'testCat2','catanimated2-lime','hat2','shirt2','pants2','shoes2','scenery3',1),(3,'testCat3:belongsToUser2','catanimated2-lime','hat3','shirt3','pants3','shoes3','scenery1',2),(4,'addcat tester','catanimated2-lime','hat4','shirt4','pants4','shoes4','scenery1',1),(5,'addcat tester','catanimated2-lime','hat4','shirt4','pants4','shoes4','scenery1',1),(6,'Dame FluffySpot Sr.','catanimated-tabby','empty','shirt6','empty','empty','scenery1',1),(7,' CuddlyKitty ','catanimated3-dark','empty','shirt9','empty','empty','scenery1',1),(8,'Sir SillyWhiskers ','catanimated2-black/white','empty','shirt10','empty','empty','scenery1',1),(9,'Dame SillySocks ','catanimated3-wbb','empty','shirt8','empty','empty','scenery4',1),(10,'Mrs. SillyCat Sr.','catanimated-pastel','empty','shirt8','empty','empty','scenery2',2);
/*!40000 ALTER TABLE `cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userPassword` varchar(128) NOT NULL,
  `userName` varchar(16) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'password','johnny'),(2,'password123','mark'),(3,'psswrd23','lisa'),(4,'password','lisa'),(5,'sdfsaf','sadfdsf'),(6,'sadfsa','sadfasdf'),(7,'dumpsterfire','password23'),(8,'asdfsda','asdf'),(9,'sdafadsf','asdfasdf'),(10,'johnny','passwor'),(11,'mark','password');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-19  0:53:49