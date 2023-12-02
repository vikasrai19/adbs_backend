-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2023 at 07:24 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nittebuscheck`
--

-- --------------------------------------------------------

--
-- Table structure for table `academicyear`
--

CREATE TABLE `academicyear` (
  `academicyear_id` varchar(60) NOT NULL,
  `academicyear` varchar(70) NOT NULL,
  `orderNo` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` (`academicyear_id`, `academicyear`, `orderNo`) VALUES
('88b19f84-b768-4f4a-8561-b67b86f00b26', '2020-2021', 1),
('c4e70535-e2e4-4cef-81c4-3ca2ad95edce', '2021-2022', 2);

-- --------------------------------------------------------

--
-- Table structure for table `boardingpoints`
--

CREATE TABLE `boardingpoints` (
  `BoardingPointid` varchar(60) NOT NULL,
  `BoardingPointName` varchar(70) NOT NULL,
  `BoardingPointNO` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `boardingpoints`
--

INSERT INTO `boardingpoints` (`BoardingPointid`, `BoardingPointName`, `BoardingPointNO`) VALUES
('3bf026f3-3bde-4462-bd25-2c9460876367', 'Manglore', 3);

-- --------------------------------------------------------

--
-- Table structure for table `busboardingpoints`
--

CREATE TABLE `busboardingpoints` (
  `busBoardingPointId` varchar(40) NOT NULL,
  `collegeBusId` varchar(40) NOT NULL,
  `academicyearId` varchar(40) NOT NULL,
  `boardingPointId` varchar(40) NOT NULL,
  `boardingTime` time NOT NULL,
  `dropTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collegebus`
--

CREATE TABLE `collegebus` (
  `collegeBusId` varchar(20) NOT NULL,
  `busNo` varchar(100) NOT NULL,
  `routeNo` varchar(90) NOT NULL,
  `regDate` date NOT NULL,
  `purchaseDate` date NOT NULL,
  `startingPoint` varchar(70) NOT NULL,
  `endingPoint` varchar(60) NOT NULL,
  `noOfSeats` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collegebusemployee`
--

CREATE TABLE `collegebusemployee` (
  `collegeBusDetailsId` varchar(40) NOT NULL,
  `collegeBusId` varchar(40) NOT NULL,
  `userId` varchar(40) NOT NULL,
  `designationId` varchar(40) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `currentStatus` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collegebususers`
--

CREATE TABLE `collegebususers` (
  `collegeBusUserId` varchar(40) NOT NULL,
  `user` varchar(40) NOT NULL,
  `busBoardingPointId` varchar(40) NOT NULL,
  `academicyearId` varchar(40) NOT NULL,
  `seatNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `designation_id` varchar(70) NOT NULL,
  `designation` varchar(56) NOT NULL,
  `orderNo` int(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`designation_id`, `designation`, `orderNo`) VALUES
('6a9dc228-f904-458f-bdb0-35edddc3fe12', 'student', 1),
('cf18e1db-6eb3-4b0f-907f-ce3e2fb3ef0d', 'staff', 2);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `usn` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `mobileno` int(40) NOT NULL,
  `busNo` int(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(40) NOT NULL,
  `name` varchar(60) NOT NULL,
  `mobileno` int(40) NOT NULL,
  `busNo` int(40) NOT NULL,
  `email` varchar(60) NOT NULL COMMENT 'ex@gmail.com',
  `password` varchar(40) NOT NULL,
  `usertype_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `mobileno`, `busNo`, `email`, `password`, `usertype_id`) VALUES
('35c247db22ca4837a0fe225732d7e01e', 'Vikas', 9448046, 0, 'nnm23mc174@nmamit.in', 'nnm23mc174', '4317d1e47f6a45c39dacdad3b8c301f4'),
('c2bff6cb897e4229b55d222ce99b6140', 'Srujan', 97400764, 1, '', '123456', '23ecf27394504c9583aebb614ba10510'),
('nu23mca158', 'srujan', 97400764, 121, 'srujan@gmail.com', '123456', '23ecf27394504c9583aebb614ba10510');

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `usertype_id` varchar(50) NOT NULL,
  `usertype` varchar(40) NOT NULL,
  `orderNo` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`usertype_id`, `usertype`, `orderNo`) VALUES
('23ecf27394504c9583aebb614ba10510', 'Admin', 1),
('4317d1e47f6a45c39dacdad3b8c301f4', 'student', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academicyear`
--
ALTER TABLE `academicyear`
  ADD PRIMARY KEY (`academicyear_id`);

--
-- Indexes for table `boardingpoints`
--
ALTER TABLE `boardingpoints`
  ADD PRIMARY KEY (`BoardingPointid`);

--
-- Indexes for table `busboardingpoints`
--
ALTER TABLE `busboardingpoints`
  ADD PRIMARY KEY (`busBoardingPointId`),
  ADD KEY `collegeBusId_FK` (`collegeBusId`),
  ADD KEY `academicyearId_FK` (`academicyearId`),
  ADD KEY `boardingPointId_FK` (`boardingPointId`);

--
-- Indexes for table `collegebus`
--
ALTER TABLE `collegebus`
  ADD PRIMARY KEY (`collegeBusId`);

--
-- Indexes for table `collegebusemployee`
--
ALTER TABLE `collegebusemployee`
  ADD PRIMARY KEY (`collegeBusDetailsId`),
  ADD KEY `collegeBusId_FK` (`collegeBusId`),
  ADD KEY `userId_FK` (`userId`),
  ADD KEY `designationId_FK` (`designationId`);

--
-- Indexes for table `collegebususers`
--
ALTER TABLE `collegebususers`
  ADD PRIMARY KEY (`collegeBusUserId`),
  ADD KEY `user_FK` (`user`),
  ADD KEY `busBoardingPointId_FK` (`busBoardingPointId`),
  ADD KEY `academicYearId_FK` (`academicyearId`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`designation_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`usn`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `usertype_id_FK` (`usertype_id`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`usertype_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `collegebusemployee`
--
ALTER TABLE `collegebusemployee`
  ADD CONSTRAINT `collegebusemployee_ibfk_1` FOREIGN KEY (`collegeBusId`) REFERENCES `collegebus` (`collegeBusId`),
  ADD CONSTRAINT `collegebusemployee_ibfk_2` FOREIGN KEY (`designationId`) REFERENCES `designation` (`designation_id`);

--
-- Constraints for table `collegebususers`
--
ALTER TABLE `collegebususers`
  ADD CONSTRAINT `collegebususers_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `collegebususers_ibfk_2` FOREIGN KEY (`busBoardingPointId`) REFERENCES `busboardingpoints` (`busBoardingPointId`),
  ADD CONSTRAINT `collegebususers_ibfk_3` FOREIGN KEY (`academicyearId`) REFERENCES `academicyear` (`academicyear_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`usertype_id`) REFERENCES `usertype` (`usertype_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
