 -- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Android (aarch64)
--
-- Host: localhost    Database: dapuraya_db
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` varchar(15) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('dapuraya','f9a407b75fccb59764b406d33ac79668');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `cart_id` int(5) NOT NULL AUTO_INCREMENT,
  `cart_amounts` int(5) NOT NULL,
  `product_id` int(5) NOT NULL,
  `order_id` int(5) NOT NULL,
  `cart_price` bigint(55) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `carts_product_id_products_product_id` (`product_id`),
  KEY `carts_order_id_orders_order_id` (`order_id`),
  CONSTRAINT `carts_order_id_orders_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_product_id_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (31,1,13,22,24000),(32,1,11,22,37000),(33,1,12,22,5000),(34,4,11,23,148000),(35,2,11,24,37037),(37,1,11,25,37000),(38,1,11,26,37000),(39,6,13,26,144000),(40,1,12,27,5000),(41,1,13,27,24000),(42,1,11,27,37000),(43,1,12,28,5000),(44,1,13,28,24000),(45,2,11,28,74000),(46,1,13,29,24000),(47,2,11,29,74000),(48,6,12,29,30000),(49,2,13,30,48000),(50,2,11,30,74000),(51,1,13,31,24000),(52,1,12,32,5000),(53,2,11,33,74000),(54,1,11,34,37000),(55,4,11,35,148000),(56,1,13,35,24000),(57,3,11,36,111000),(58,1,13,36,24000),(59,1,11,37,37000),(60,1,13,37,24000),(61,2,13,38,48000),(62,2,12,38,10000),(63,1,11,38,37000),(64,1,13,39,24000),(65,2,11,39,74000),(66,7,12,39,35000),(68,4,13,24,96000);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drop_points`
--

DROP TABLE IF EXISTS `drop_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drop_points` (
  `drop_point_id` int(10) NOT NULL AUTO_INCREMENT,
  `drop_point_name` varchar(15) NOT NULL,
  `drop_point_gmaps` varchar(255) NOT NULL,
  `drop_point_status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`drop_point_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drop_points`
--

LOCK TABLES `drop_points` WRITE;
/*!40000 ALTER TABLE `drop_points` DISABLE KEYS */;
INSERT INTO `drop_points` VALUES (1,'Amuntai','bit.ly',0),(2,'Marabahan','bit.ly',0),(3,'Handil Bakti','bit.ly',1);
/*!40000 ALTER TABLE `drop_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `open_orders`
--

DROP TABLE IF EXISTS `open_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `open_orders` (
  `open_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `drop_point_id` int(10) NOT NULL,
  `open_order_date` bigint(100) NOT NULL,
  PRIMARY KEY (`open_order_id`),
  KEY `open_order_drop_point_id_drop_points_drop_point_id` (`drop_point_id`),
  CONSTRAINT `open_order_drop_point_id_drop_points_drop_point_id` FOREIGN KEY (`drop_point_id`) REFERENCES `drop_points` (`drop_point_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_orders`
--

LOCK TABLES `open_orders` WRITE;
/*!40000 ALTER TABLE `open_orders` DISABLE KEYS */;
INSERT INTO `open_orders` VALUES (1,2,1647993600000),(2,1,1647993700000),(3,3,1647648000000),(4,3,1647734400000),(6,1,1648137600000),(7,3,1648137600000),(8,3,1650816000000);
/*!40000 ALTER TABLE `open_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `open_order_id` int(5) NOT NULL,
  `drop_point_id` int(10) NOT NULL,
  `order_customer` varchar(50) NOT NULL,
  `order_customer_phone` varchar(15) NOT NULL,
  `order_customer_address` varchar(100) NOT NULL,
  `order_delivered` tinyint(1) NOT NULL,
  `order_total_price` bigint(50) NOT NULL,
  `order_total_item` int(5) NOT NULL,
  `order_payment_status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_id`),
  KEY `orders_open_order_id_open_order_open_order_id` (`open_order_id`),
  KEY `orders_drop_point_id_drop_points_drop_point_id` (`drop_point_id`),
  CONSTRAINT `orders_drop_point_id_drop_points_drop_point_id` FOREIGN KEY (`drop_point_id`) REFERENCES `drop_points` (`drop_point_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_open_order_id_open_order_open_order_id` FOREIGN KEY (`open_order_id`) REFERENCES `open_orders` (`open_order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (22,3,3,'Atiya','9874693484','Handil Pandan',0,66000,3,0),(23,3,3,'Aulia Rahmah','987654789','Semangat Dalam RT6 RW2',1,148000,4,0),(24,3,3,'Adinda Luna','09865374833','Komplek Lily',0,143037,8,0),(25,3,3,'Udin','90689678','Handil',1,37000,1,0),(26,3,3,'Rizqa','937593874248','handil',1,181000,7,0),(27,3,3,'ijhihi','8768','hiuuihihi',1,66000,3,0),(28,3,3,'hkhguhgk','78768768','ugugiyuf',1,103000,4,0),(29,3,3,'ghvfgfg','7788698','uguiygfuiyfyu',1,128000,9,0),(30,3,3,'Oka','498579484','handil',0,122000,4,0),(31,3,3,'Juki','2937549879','Gampa',0,24000,1,0),(32,3,3,'juki','980980878','Gampa',0,5000,1,0),(33,3,3,'Juki','845782479','Gampa',1,74000,2,0),(34,3,3,'Juki','293740265792','Gampa',1,37000,1,0),(35,3,3,'Juki','34793879240','Gampa',1,172000,5,0),(36,3,3,'Juki','749384023','Hampod',1,135000,4,0),(37,3,3,'Juki','9374023897','Hakodu',1,61000,2,0),(38,3,3,'Juki','979768769','handil',0,95000,5,0),(39,8,3,'Oka R Abdillah','85654036810','Handil Bakti',0,133000,10,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(35) NOT NULL,
  `product_price` bigint(35) NOT NULL,
  `product_stock` int(5) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (11,'Bingka Berandam',37000,45,'http://localhost:8000/uploads/product-10bcac017acc8c39bf93231838175638.jpg'),(12,'Pais Pisang',5000,23,'http://localhost:8000/uploads/product-a685b0ae9296f2b4d51f5c4054cf1ed3.jpg'),(13,'American Risoles',24000,30,'http://localhost:8000/uploads/product-81132cd568c30d66b3b3634c4ceeb0fc.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-25 20:35:03
