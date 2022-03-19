Enter password: 
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
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
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
  CONSTRAINT `carts_order_id_orders_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `carts_product_id_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,2,2,1,60000),(2,1,1,1,45000),(3,1,1,2,45000),(4,2,2,7,60000),(5,2,1,7,90000),(6,2,2,8,60000),(7,3,1,8,135000);
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
  PRIMARY KEY (`drop_point_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drop_points`
--

LOCK TABLES `drop_points` WRITE;
/*!40000 ALTER TABLE `drop_points` DISABLE KEYS */;
INSERT INTO `drop_points` VALUES (1,'Amuntai','bit.ly'),(2,'Marabahan','bit.ly'),(3,'Handil Bakti','bit.ly');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_orders`
--

LOCK TABLES `open_orders` WRITE;
/*!40000 ALTER TABLE `open_orders` DISABLE KEYS */;
INSERT INTO `open_orders` VALUES (1,3,1647475200000),(2,3,1647561600000),(3,3,1647648000000),(4,3,1647734400000);
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
  `order_payment_status` tinyint(1) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `orders_open_order_id_open_order_open_order_id` (`open_order_id`),
  KEY `orders_drop_point_id_drop_points_drop_point_id` (`drop_point_id`),
  CONSTRAINT `orders_drop_point_id_drop_points_drop_point_id` FOREIGN KEY (`drop_point_id`) REFERENCES `drop_points` (`drop_point_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_open_order_id_open_order_open_order_id` FOREIGN KEY (`open_order_id`) REFERENCES `open_orders` (`open_order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,3,'Maulana','086756342030','Sungai Andai RT06 RW02',0,105000,3,0),(2,3,3,'Anshori','086756342030','Sungai Andai RT06 RW02',0,45000,1,0),(3,1,3,'Ansa','08673452398','Handil Pandan',1,2,60000,0),(4,1,2,'Atiya','08673452398','Handil Pandan',1,2,90000,0),(5,1,1,'Atiya','08673452398','Handil Pandan',1,2,90000,0),(6,1,2,'Ansa','08673452398','Handil Pandan',1,4,150000,0),(7,1,3,'Ansa','08673452398','Handil Pandan',1,4,150000,0),(8,3,1,'Aulia','08673452398','Handil Pandan',1,195000,4,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'American Risol',45000,30,'/american-risol.jpg'),(2,'Kue Cubit',30000,30,'/american-risol.jpg');
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

-- Dump completed on 2022-03-19 18:27:41
