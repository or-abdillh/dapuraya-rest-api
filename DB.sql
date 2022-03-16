DROP TABLE IF EXISTS drop_points;
DROP TABLE IF EXISTS open_order;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS admin;


CREATE TABLE drop_points (
drop_point_id INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
drop_point_name VARCHAR(15) NOT NULL,
drop_point_gmaps VARCHAR(255) NOT NULL);

CREATE TABLE open_order (
open_order_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
drop_point_id INT(10) NOT NULL,
open_order_date BIGINT(100) NOT NULL);

CREATE TABLE products (
product_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
product_name VARCHAR(35) NOT NULL,
product_price BIGINT(35) NOT NULL,
product_stock INT(5) NOT NULL,
product_image VARCHAR(100) NOT NULL);

CREATE TABLE orders (
order_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
open_order_id INT(5) NOT NULL,
order_customer VARCHAR(50) NOT NULL,
order_customer_phone VARCHAR(15) NOT NULL,
order_customer_address VARCHAR(100) NOT NULL,
order_delivered BOOLEAN NOT NULL,
order_total_price BIGINT(50) NOT NULL,
order_total_item INT(5) NOT NULL,
order_payment_done BOOLEAN NOT NULL);

CREATE TABLE carts (
cart_id INT(5) PRIMARY KEY AUTO_INCREMENT NOT NULL,
cart_amounts INT(5) NOT NULL,
product_id INT(5) NOT NULL,
order_id INT(5) NOT NULL);

CREATE TABLE admin (
username VARCHAR(15) NOT NULL,
password VARCHAR(15) NOT NULL);

ALTER TABLE open_order ADD CONSTRAINT open_order_drop_point_id_drop_points_drop_point_id FOREIGN KEY (drop_point_id) REFERENCES drop_points(drop_point_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE orders ADD CONSTRAINT orders_open_order_id_open_order_open_order_id FOREIGN KEY (open_order_id) REFERENCES open_order(open_order_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE carts ADD CONSTRAINT carts_product_id_products_product_id FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE carts ADD CONSTRAINT carts_order_id_orders_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE NO ACTION ON UPDATE NO ACTION;
