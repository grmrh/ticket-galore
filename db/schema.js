CREATE TABLE `user_interests` (
  `user_interest_id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  `lookup_event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_interest_id`),
  KEY `user_id` (`user_id`),
  KEY `lookup_event_id` (`lookup_event_id`),
  CONSTRAINT `user_interests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_interests_ibfk_2` FOREIGN KEY (`lookup_event_id`) REFERENCES `lookup_events` (`lookup_event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


CREATE TABLE `tickets` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

SELECT * FROM tickets_db.ticket_trades;CREATE TABLE `ticket_trades` (
  `ticket_trade_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_for_bid_user` varchar(255) DEFAULT NULL,
  `bid_status` enum('in_pool','trade_progress','claimed') DEFAULT 'in_pool',
  `bid_time` datetime DEFAULT NULL,
  `ticket_to_bid_user` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ticket_for_bid_id` int(11) DEFAULT NULL,
  `ticket_to_bid_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ticket_trade_id`),
  KEY `ticket_for_bid_id` (`ticket_for_bid_id`),
  KEY `ticket_to_bid_id` (`ticket_to_bid_id`),
  CONSTRAINT `ticket_trades_ibfk_1` FOREIGN KEY (`ticket_for_bid_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ticket_trades_ibfk_2` FOREIGN KEY (`ticket_to_bid_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_identity` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `about_me` text,
  `last_login` datetime DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `lookup_events` (
  `lookup_event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_name` varchar(45) DEFAULT NULL,
  `image_stored_at` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lookup_event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
