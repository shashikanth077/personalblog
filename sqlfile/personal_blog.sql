-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2020 at 10:54 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `personal_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `blog_type` varchar(100) NOT NULL,
  `blog_description` text NOT NULL,
  `blog_title` varchar(100) NOT NULL,
  `blog_author` varchar(100) NOT NULL,
  `blog_image` varchar(400) NOT NULL,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `blog_type`, `blog_description`, `blog_title`, `blog_author`, `blog_image`, `created_date`) VALUES
(1, 'Web Development', 'Explained how to create REST API with mysql and php.', 'REST API using PHP and MySQL', 'Shashikanth HR', 'http://localhost:3030/static/blog/images/post-1.jpg', '2020-05-17 00:00:00'),
(2, 'Web Development', 'Explained how to create REST API with mysql and php.', 'REST API using PHP and MySQL', 'Shashikanth HR', 'http://localhost:3030/static/blog/images/post-1.jpg', '2020-05-17 00:00:00'),
(3, 'Web Development', 'Explained how to create REST API with mysql and php.', 'REST API using PHP and MySQL', 'Shashikanth HR', 'http://localhost:3030/static/blog/images/post-1.jpg', '2020-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `subject` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `message`, `subject`) VALUES
(1, '0', 'shashikanth.hr@fortunesoftit.com', 'dd', 'sdg'),
(2, 'shashu', 'shashikanth.hr@fortunesoftit.com', 'dd', 'sdg'),
(3, 'shasssss', 'ssss@gmail.com', 'ssssss', 'sddss'),
(4, 'shasssss', 'ssss@gmail.com', 'ssssss', 'sddss'),
(5, 'shash', 'shashi@gmail.com', 'ssss', 'shashi'),
(6, 'shashi', 'rsr@gmail.com', 'ss', 'ss'),
(7, 'shashi', 'shashi@gmail.com', 'sdsdsd', 'sas');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_description` text NOT NULL,
  `icon_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `service_description`, `icon_name`) VALUES
(1, 'WEB DESIGN', 'Web design is the main attracting section in front-end', 'ion-monitor'),
(2, 'Web Development', 'Dynamic Content of pages are more important in real world', ''),
(3, 'E-Commerce', 'Without E-Commerce nothing can not be do in world now a days', '');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_rate` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`skill_id`, `skill_name`, `skill_rate`, `user_id`) VALUES
(1, 'HTML', 80, 1),
(2, 'PHP', 95, 1),
(3, 'Javascript', 80, 1),
(4, 'Laravel', 90, 1),
(5, 'React JS', 75, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `photo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `name`, `designation`, `email`, `phone`, `description`, `photo`) VALUES
(1, 'Shashikanth HR', 'Software Engineer', 'shashikanth033@gmail', '(91+)8123192799', 'Experienced Senior Software Engineer with a demonstrated history of working in the information technology and services industry. Skilled in PHP, Application Programming Interfaces, Databases(MySQL) , CodeIgniter, Laravel, Javascript. Strong engineering professional with a Bachelor of Engineering (BEng) focused in Computer Science from Visvesvaraya Technological University. ', 'ss');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
