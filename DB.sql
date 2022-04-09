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
INSERT INTO `admin` VALUES ('admin','c93ccd78b2076528346216b3b2f701e6');
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
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drop_points`
--

LOCK TABLES `drop_points` WRITE;
/*!40000 ALTER TABLE `drop_points` DISABLE KEYS */;
INSERT INTO `drop_points` VALUES (1,'Alalak','bit.ly',0),(2,'Marabahan','bit.ly',0),(3,'Handil Bakti','bit.ly',1);
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
  `coureer_available` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`open_order_id`),
  KEY `open_order_drop_point_id_drop_points_drop_point_id` (`drop_point_id`),
  CONSTRAINT `open_order_drop_point_id_drop_points_drop_point_id` FOREIGN KEY (`drop_point_id`) REFERENCES `drop_points` (`drop_point_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_orders`
--

LOCK TABLES `open_orders` WRITE;
/*!40000 ALTER TABLE `open_orders` DISABLE KEYS */;
INSERT INTO `open_orders` VALUES (1,2,1651017600000,1),(2,3,1656518400000,0),(3,2,1647619200000,1),(4,3,1647734400000,1),(6,3,1648137600000,1),(7,3,1648137600000,1),(8,2,1650816000000,1),(9,1,1648425600000,0),(10,1,1648425600000,1),(11,3,1648080000000,1);
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
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Kue Nastar',30000,12,'http://localhost:8000/uploads/product-10dbb3416b66c6bad8544a997b0a8f1e.jpeg'),(3,'Bingka Berandam',45000,40,'http://localhost:8000/uploads/product-9aa3c5532d2199ed86b4d901a3f6325b.jpeg'),(5,'Wajik',12000,44,'http://localhost:8000/uploads/product-ce0d8f4488c7f2eb582ec678c261a0a4.jpeg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_available`
--

DROP TABLE IF EXISTS `products_available`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_available` (
  `available_id` int(5) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `open_order_id` int(11) NOT NULL,
  PRIMARY KEY (`available_id`),
  KEY `products_available_product_id_products_product_id` (`product_id`),
  KEY `products_available_open_order_id_open_orders_open_order_id` (`open_order_id`),
  CONSTRAINT `products_available_open_order_id_open_orders_open_order_id` FOREIGN KEY (`open_order_id`) REFERENCES `open_orders` (`open_order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_available_product_id_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_available`
--

LOCK TABLES `products_available` WRITE;
/*!40000 ALTER TABLE `products_available` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_available` ENABLE KEYS */;
UNLOCK TABLES;
-- Dump completed on 2022-04-09  9:17:37
