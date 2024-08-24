Use UserDB;

CREATE TABLE `usertbl` ( 
`userID` INT NOT NULL AUTO_INCREMENT , 
`first_name` VARCHAR(45) NOT NULL , 
`last_name` VARCHAR(45) NOT NULL , 
`email` VARCHAR(45) NOT NULL ,
 `phone` VARCHAR(45) NOT NULL ,
 `comments` TEXT NOT NULL , 
 `status` VARCHAR(10) NOT NULL DEFAULT 'active' , 
 PRIMARY KEY (`userID`)
) ENGINE = InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 
LOCK TABLES `usertbl` WRITE;
INSERT INTO `usertbl` VALUES(1 ,'Aniket' , 'Dutta' , 'aniket@gmail', '98745620' , 'comment 6' , 'inactive' );
UNLOCK TABLES;