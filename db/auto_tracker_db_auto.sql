/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE /*!32312 IF NOT EXISTS*/ `auto_tracker_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `auto_tracker_db`;
DROP TABLE IF EXISTS `auto`;
CREATE TABLE `auto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `mileage` int NOT NULL,
  `vin` varchar(255) NOT NULL,
  `license_plate` varchar(255) NOT NULL,
  `toll_tag` varchar(255) NOT NULL,
  `registration_expiration` date NOT NULL,
  `insurance_expiration` date NOT NULL,
  `oil_mileage` int NOT NULL,
  `tire_mileage` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `owner_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `auto_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owner` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auto_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `auto` (`id`,`make`,`model`,`color`,`year`,`mileage`,`vin`,`license_plate`,`toll_tag`,`registration_expiration`,`insurance_expiration`,`oil_mileage`,`tire_mileage`,`created_at`,`updated_at`,`owner_id`,`driver_id`) VALUES (3,'Volkswagen','CC','grey',2012,33000,'WVWNP7AN9CE533802','BCX1364','HCTRA05689841','2021-06-01','2021-02-03',33000,34000,'2020-11-06 03:02:21','2020-11-06 03:02:21',1,1),(4,'Audi','A5','white',2012,33000,'WAURFAFR2CA003155','CRP6302','HCTRA05689841','2021-06-01','2021-02-03',33000,34000,'2020-11-06 20:20:31','2020-11-07 02:40:32',1,2),(5,'Mercedes','SL-65 AMG','black',2019,33,'WDBSK79F17F127395','HGT1364','HCTRA05689841','2021-06-01','2021-02-03',33000,34000,'2020-11-06 20:21:51','2020-11-07 02:35:40',1,3),(6,'GMC','Yukon XL','dark gray',2017,25500,'1GKS1GKC9GR401708','LYD0892','HCTRA045689841','2021-06-01','2021-02-03',33000,34000,'2020-11-06 20:23:21','2020-11-07 02:43:53',1,1);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
