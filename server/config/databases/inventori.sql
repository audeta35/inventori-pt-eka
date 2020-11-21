-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 21, 2020 at 06:03 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventori`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id_company` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_address` text NOT NULL,
  `company_email` varchar(30) NOT NULL,
  `company_phone` varchar(12) NOT NULL,
  `company_picture` text NOT NULL,
  `company_website` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id_company`, `company_name`, `company_address`, `company_email`, `company_phone`, `company_picture`, `company_website`) VALUES
(1, 'testing', 'testaddress', 'testemail', '0811111', 'test.jpg', 'www.testing.cosm');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id_ingredient` int(11) NOT NULL,
  `ingredient_code` varchar(20) NOT NULL,
  `ingredient_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id_ingredient`, `ingredient_code`, `ingredient_name`) VALUES
(1, 'testing', 'testing'),
(2, 'K3M4S4N', 'Kemasan');

-- --------------------------------------------------------

--
-- Table structure for table `inputs`
--

CREATE TABLE `inputs` (
  `id_input` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_suplier` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `item_amount` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inputs`
--

INSERT INTO `inputs` (`id_input`, `id_product`, `id_suplier`, `id_user`, `item_amount`, `total_price`, `created_time`, `deleted_time`) VALUES
(1, 1, 2, 2, 100, 500000, '2020-11-21 03:09:22', '0000-00-00 00:00:00'),
(2, 1, 2, 2, 20, 100000, '2020-11-21 03:30:59', '0000-00-00 00:00:00'),
(3, 2, 2, 2, 100, 50000, '2020-11-21 04:56:37', '0000-00-00 00:00:00'),
(4, 1, 2, 2, 20, 10000, '2020-11-21 04:58:29', '0000-00-00 00:00:00'),
(5, 1, 2, 2, 20, 10000, '2020-11-21 04:58:47', '0000-00-00 00:00:00'),
(6, 2, 2, 2, 0, 10000, '2020-11-21 04:59:12', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_schema`
--

CREATE TABLE `invoice_schema` (
  `id_invoice_schema` int(11) NOT NULL,
  `id_output` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `outputs`
--

CREATE TABLE `outputs` (
  `id_output` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `product_list` text NOT NULL,
  `delivery_order` varchar(20) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `batch_number` varchar(20) NOT NULL,
  `total_price` int(11) NOT NULL,
  `address` text NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_code` varchar(20) NOT NULL,
  `product_stock` int(11) NOT NULL,
  `product_ed` date NOT NULL,
  `product_original_packing` int(11) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_product`, `id_ingredient`, `product_name`, `product_code`, `product_stock`, `product_ed`, `product_original_packing`, `created_time`, `deleted_time`) VALUES
(1, 2, 'Paramexs', '', 180, '2020-10-10', 10, '2020-11-21 03:33:02', NULL),
(2, 2, 'KOMIX', 'KMX', 100, '2020-10-10', 10, '2020-11-21 04:56:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `suplier`
--

CREATE TABLE `suplier` (
  `id_suplier` int(11) NOT NULL,
  `suplier_name` varchar(50) NOT NULL,
  `suplier_address` text NOT NULL,
  `suplier_phone` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suplier`
--

INSERT INTO `suplier` (`id_suplier`, `suplier_name`, `suplier_address`, `suplier_phone`) VALUES
(2, 'PT TESTING', 'Jalan testing surya kencana', '0878111112');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `level` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `password`, `address`, `level`, `status`) VALUES
(2, 'testing', '8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414', 'gci', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id_company`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id_ingredient`);

--
-- Indexes for table `inputs`
--
ALTER TABLE `inputs`
  ADD PRIMARY KEY (`id_input`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_suplier` (`id_suplier`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `invoice_schema`
--
ALTER TABLE `invoice_schema`
  ADD PRIMARY KEY (`id_invoice_schema`),
  ADD KEY `id_output` (`id_output`);

--
-- Indexes for table `outputs`
--
ALTER TABLE `outputs`
  ADD PRIMARY KEY (`id_output`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_ingredient` (`id_ingredient`);

--
-- Indexes for table `suplier`
--
ALTER TABLE `suplier`
  ADD PRIMARY KEY (`id_suplier`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id_company` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inputs`
--
ALTER TABLE `inputs`
  MODIFY `id_input` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `invoice_schema`
--
ALTER TABLE `invoice_schema`
  MODIFY `id_invoice_schema` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `outputs`
--
ALTER TABLE `outputs`
  MODIFY `id_output` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suplier`
--
ALTER TABLE `suplier`
  MODIFY `id_suplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inputs`
--
ALTER TABLE `inputs`
  ADD CONSTRAINT `inputs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inputs_ibfk_2` FOREIGN KEY (`id_suplier`) REFERENCES `suplier` (`id_suplier`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inputs_ibfk_3` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_schema`
--
ALTER TABLE `invoice_schema`
  ADD CONSTRAINT `invoice_schema_ibfk_1` FOREIGN KEY (`id_output`) REFERENCES `outputs` (`id_output`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `outputs`
--
ALTER TABLE `outputs`
  ADD CONSTRAINT `outputs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id_ingredient`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
