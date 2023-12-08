-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 10:34 AM
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
('6bc54b4e-35b2-49e3-964c-f5d11970a685', '2023', 3),
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
('3a976c5d-8835-4918-b373-3511fe837216', 'goa', 5),
('3bf026f3-3bde-4462-bd25-2c9460876367', 'Manglore', 3),
('951773e9-cd8a-4147-9637-a7fb7dc70f50', 'mysore', 2);

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

--
-- Dumping data for table `busboardingpoints`
--

INSERT INTO `busboardingpoints` (`busBoardingPointId`, `collegeBusId`, `academicyearId`, `boardingPointId`, `boardingTime`, `dropTime`) VALUES
('2a33e7a5-15fe-4d9e-bbce-1bb548529084', '37902748ffbe47993', '6bc54b4e35b249e3964cf5d11970a677', '3a976c5d88354918b3733511fe83723', '10:10:17', '15:12:15'),
('6969bf01-c6e5-4e6b-bd29-53c73c58e032', '37902748ffbe47969', '6bc54b4e35b249e3964cf5d11970a685', '3a976c5d88354918b3733511fe837216', '10:10:10', '15:12:10'),
('73dce93c-9204-4b80-b410-94f19faf6d25', '37902748ffbe47999', '6bc54b4e35b249e3964cf5d11970a675', '3a976c5d88354918b3733511fe837218', '10:10:17', '15:12:15');

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
  `noOfSeats` int(60) NOT NULL,
  `busImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collegebus`
--

INSERT INTO `collegebus` (`collegeBusId`, `busNo`, `routeNo`, `regDate`, `purchaseDate`, `startingPoint`, `endingPoint`, `noOfSeats`, `busImage`) VALUES
('12', '2', '4', '2023-12-18', '2023-12-12', 'bedra', 'kudla', 89, '2'),
('37902748-ffbe-4796-9', '2', '5', '0000-00-00', '0000-00-00', 'Kundapura', 'goa', 47, '0'),
('606072d2-6e3b-4e1c-a', '4', '3', '2023-01-21', '2023-04-20', 'Mangalore', 'Nitte', 57, '0'),
('a9118d39-f764-456f-9', '7', '4', '2023-02-21', '2023-06-20', 'Nitte', 'udupi', 53, '2');

-- --------------------------------------------------------

--
-- Table structure for table `collegebusemployee`
--

CREATE TABLE `collegebusemployee` (
  `collegeBusEmpId` varchar(40) NOT NULL,
  `name` varchar(60) NOT NULL,
  `collegeBusId` varchar(40) NOT NULL,
  `designationId` varchar(40) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `phono` int(150) NOT NULL,
  `empimg` varchar(1000) NOT NULL,
  `currentStatus` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collegebusemployee`
--

INSERT INTO `collegebusemployee` (`collegeBusEmpId`, `name`, `collegeBusId`, `designationId`, `startDate`, `endDate`, `phono`, `empimg`, `currentStatus`) VALUES
('51bf730e-6531-4556-9960-dd0b3eeccca1', 'yamuna', 'a9118d39-f764-456f-9', 'b1832cb0c66246b493d72da60cd206d0', '0000-00-00', '0000-00-00', 898989, 'yt.png', 'True');

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
('b1832cb0c66246b493d72da60cd206d0', 'driver', 0),
('cf18e1db-6eb3-4b0f-907f-ce3e2fb3ef0d', 'staff', 2);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `usn` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mobileno` int(255) NOT NULL,
  `busNo` int(20) NOT NULL,
  `stdImage` varchar(1000) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`usn`, `name`, `email`, `mobileno`, `busNo`, `stdImage`, `password`) VALUES
('nu23mca156', 'srinjana', 'sanju@gmail.com', 2147483647, 4, 'a', 'nu23mca156'),
('nu23mca176', 'srinh', 'satju@gmail.com', 2147483647, 5, 't', 'nu23mca155');

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
  `userImage` varchar(1000) NOT NULL,
  `usertype_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `mobileno`, `busNo`, `email`, `password`, `userImage`, `usertype_id`) VALUES
('35c247db22ca4837a0fe225732d7e01e', 'sajjige', 2147483647, 9, 'sajjige@gmail.com', '1234', 'nittre.png', '4317d1e47f6a45c39dacdad3b8c301f4'),
('7a98aeed-9cf8-4582-87ef-597a2ce675ac', 'KUKURU', 2147483647, 7, 'sjuY@gmail.com', 'nu23mca1456', 'pathtoimgg.png', '4317d1e47f6a45c39dacdad3b8c301f4'),
('a4a85346-12a8-48c5-85d8-823150ce3037', 'manOJ', 2147483647, 3, 'sju@gmail.com', 'nu23mca145', 'pathtoimg.png', '4317d1e47f6a45c39dacdad3b8c301f4'),
('c2bff6cb897e4229b55d222ce99b6140', 'Srujan', 97400764, 1, '', '123456', '', '23ecf27394504c9583aebb614ba10510'),
('f5fe7ff0-f506-473c-82c9-cbf0eae11127', 'rinh', 2147483647, 0, 'stju@gmail.com', '9740076357', '', '4317d1e47f6a45c39dacdad3b8c301f4'),
('nu23mca158', 'srujan', 97400764, 121, 'srujan@gmail.com', '123456', '', '23ecf27394504c9583aebb614ba10510');

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
('4317d1e47f6a45c39dacdad3b8c301f4', 'student', 2),
('56d33d7538cd458b83e2279eefba4a1f', 'driver', 0),
('79b31af46d80415884257d516c70a2b3', 'Staff', 3);

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
  ADD PRIMARY KEY (`collegeBusEmpId`),
  ADD KEY `collegeBusId_FK` (`collegeBusId`),
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
