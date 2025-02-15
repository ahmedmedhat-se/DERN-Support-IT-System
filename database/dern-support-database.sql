-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2025 at 04:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dern-support-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comments` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `user_id`, `request_id`, `rating`, `comments`, `created_at`) VALUES
(7, 1, 1, 5, 'Excellent service!', '2025-02-15 15:02:45'),
(8, 4, 2, 4, 'Good support, but can be faster.', '2025-02-15 15:02:45'),
(9, 6, 3, 3, 'Average experience.', '2025-02-15 15:02:45'),
(10, 9, 4, 5, 'Amazing customer service!', '2025-02-15 15:02:45'),
(11, 11, 5, 4, 'Very helpful technician.', '2025-02-15 15:02:45');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_status` enum('Pending','Completed','Failed') DEFAULT 'Pending',
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Laptop Repair', 'Professional laptop repair services', 100.00, 'https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg', '2025-02-14 17:29:15', '2025-02-14 17:29:15'),
(2, 'Virus Removal', 'Complete virus and malware removal', 50.00, 'https://ttsquad.com/wp-content/uploads/2017/06/virus-removal.jpg', '2025-02-14 17:29:15', '2025-02-14 17:29:15'),
(3, 'On-Site IT Support', 'Our technicians provide on-site support for businesses, ensuring minimal downtime and maximum productivity.', 150.00, 'https://c4.wallpaperflare.com/wallpaper/447/85/162/computer-lights-glow-blur-wallpaper-preview.jpg', '2025-02-14 17:29:15', '2025-02-14 17:29:15'),
(4, 'Computer Repairs', 'We offer fast and reliable repair services for both hardware and software issues.', 120.00, 'https://c1.wallpaperflare.com/preview/415/696/9/service-computers-repair-electronics-computer-computer-equipment.jpg', '2025-02-14 17:29:15', '2025-02-14 17:29:15'),
(5, 'Software Troubleshooting', 'From virus removal to OS updates, we ensure your system is secure and efficient.', 75.00, 'https://www.shutterstock.com/shutterstock/videos/3563670065/thumb/1.jpg?ip=x480', '2025-02-14 17:29:15', '2025-02-14 17:29:15'),
(6, 'Data Recovery', 'Lost important files? Our experts help recover data from damaged devices.', 200.00, 'https://www.vmwarearena.com/wp-content/uploads/2019/09/Data-Recovery-Software-1024x682.jpg', '2025-02-14 17:29:15', '2025-02-14 17:29:15'),
(7, 'Network Setup', 'We install and configure wired/wireless networks for homes and offices.', 180.00, 'https://img.freepik.com/free-photo/young-man-engineer-making-program-analyses_1303-20402.jpg', '2025-02-14 17:29:15', '2025-02-14 17:29:15');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `technician_id` int(11) DEFAULT NULL,
  `device_type` varchar(255) NOT NULL,
  `issue_description` text NOT NULL,
  `status` enum('Pending','In Progress','Completed') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `user_id`, `technician_id`, `device_type`, `issue_description`, `status`, `created_at`) VALUES
(1, 1, 1, 'Laptop', 'Screen flickering issue', 'Pending', '2025-02-15 15:01:49'),
(2, 4, 8, 'Smartphone', 'Battery drains too fast', 'In Progress', '2025-02-15 15:01:49'),
(3, 6, 2, 'Tablet', 'Touchscreen not responding', 'Completed', '2025-02-15 15:01:49'),
(4, 9, 3, 'Desktop', 'Slow performance', 'Pending', '2025-02-15 15:01:49'),
(5, 11, 5, 'Printer', 'Paper jam error', 'In Progress', '2025-02-15 15:01:49');

-- --------------------------------------------------------

--
-- Table structure for table `technicians`
--

CREATE TABLE `technicians` (
  `technician_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `skillset` text NOT NULL,
  `availability` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technicians`
--

INSERT INTO `technicians` (`technician_id`, `name`, `email`, `phone`, `skillset`, `availability`, `created_at`) VALUES
(1, 'John Doe', 'john.doe@example.com', '123-456-7890', 'Networking, Hardware Repair', 1, '2023-10-01 08:00:00'),
(2, 'Jane Smith', 'jane.smith@example.com', '987-654-3210', 'Software Installation, Troubleshooting', 1, '2023-10-02 09:30:00'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '555-123-4567', 'Database Management, Security', 0, '2023-10-03 07:15:00'),
(4, 'Bob Brown', 'bob.brown@example.com', '444-555-6666', 'Cloud Computing, Virtualization', 1, '2023-10-04 12:45:00'),
(5, 'Charlie Davis', 'charlie.davis@example.com', '777-888-9999', 'Web Development, API Integration', 1, '2023-10-05 14:20:00'),
(6, 'Eva Green', 'eva.green@example.com', '222-333-4444', 'Mobile App Development, UI/UX Design', 0, '2023-10-06 06:00:00'),
(7, 'Frank Wilson', 'frank.wilson@example.com', '111-222-3333', 'System Administration, Backup Solutions', 1, '2023-10-07 10:10:00'),
(8, 'Grace Lee', 'grace.lee@example.com', '999-888-7777', 'Data Analysis, Machine Learning', 1, '2023-10-08 11:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `phone`, `created_at`, `role`, `password`) VALUES
(1, 'Hassan Alaa', 'hassan@gmail.com', '01000000000', '2025-02-14 12:06:03', 'user', 'hassanAlaa'),
(4, 'Ahmed', 'ahmed@yahoo.com', '01000000000', '2025-02-14 12:18:00', 'user', '$2b$10$EfOlPHeG0xJv4AlOFiyTpO3HN.J2sB7uOAb8Mm1ix9lB9ry39Bwtq'),
(6, 'Youssef', 'joe@gmail.com', '01000000000', '2025-02-14 12:38:44', 'user', '$2b$10$4ZhyLPphHZLQJc/uB3Z9gOzUFtv8gTWz5CoDIzsu.zvwN3SqOrpUS'),
(9, 'John Doe', 'john@example.com', '1234567890', '2025-02-14 14:27:28', 'user', '$2b$10$YePtZOgwcOOk.dMr9aEnDu5ouqHTFMh4eFlpB1xVbGt2G37lT17bu'),
(10, 'Admin', 'admin@gmail.com', '01000000000', '2025-02-14 14:47:24', 'admin', '$2b$10$UZo0HpniZw9lhHzcFbAVqu29jAOkK1ebB6ZJUPPZrr/gJP0/25b0C'),
(11, 'YoussefWalid', 'walid@yahoo.com', '01100000000', '2025-02-15 10:25:26', 'user', '$2b$10$edDXXM.cAUGNxC5GyQu3q.PWYg9iL.0KJEx4wW3UqWve.lklds8em'),
(12, 'Medhat', 'medhat@dern.com', '01200000000', '2025-02-15 10:37:33', 'user', '$2b$10$t.yilR.xkn2thSCHJpoPDuw7TnYga6uMBW6q8CW/ncY0fhhI4fkIy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `technician_id` (`technician_id`);

--
-- Indexes for table `technicians`
--
ALTER TABLE `technicians`
  ADD PRIMARY KEY (`technician_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `technicians`
--
ALTER TABLE `technicians`
  MODIFY `technician_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`technician_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
