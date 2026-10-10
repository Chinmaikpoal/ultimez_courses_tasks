-- ========================================================
-- Ultimez Frontend Developer Internship — Task 2: Add To Cart
-- Database Schema and Seed Data
-- ========================================================

-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS `ultimez_interview_tasks` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `ultimez_interview_tasks`;

-- Drop existing table if needed
DROP TABLE IF EXISTS `tbl_products`;

-- Create Table tbl_products
CREATE TABLE `tbl_products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) NOT NULL,
  `product_price` DECIMAL(22,2) NOT NULL,
  `product_image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert the 8 Official Products from Ultimez SQL Assignment
INSERT INTO `tbl_products` (`id`, `product_name`, `product_price`, `product_image`) VALUES
(1, 'Men Solid Orange', 499.00, 'image1.jpeg'),
(2, 'Men Graphic Print', 451.00, 'image2.jpeg'),
(3, 'Men Graphic Print', 599.00, 'image3.jpeg'),
(4, 'Men Striped Polo', 479.00, 'image4.jpeg'),
(5, 'Striped Black', 349.00, 'image5.jpeg'),
(6, 'Typography', 600.00, 'image6.jpeg'),
(7, 'Men Printed Hooded', 334.00, 'image7.jpeg'),
(8, 'Embroidered Red Shirt', 453.00, 'image8.jpeg');
