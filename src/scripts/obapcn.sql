CREATE TABLE IF NOT EXISTS `codes` (
  `ai` varchar(128) DEFAULT NULL,
  `ac` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `objects` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `floors` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `objectid` INT(10) UNSIGNED NOT NULL,
    `plot` varchar (255),
    PRIMARY KEY (`id`),
    INDEX `FK__objects` (`objectid`),
    CONSTRAINT `FK__objects` FOREIGN KEY (`objectid`) REFERENCES `objects` (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `flats` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `objectid` INT(10) UNSIGNED NOT NULL,
    `obfloor` INT(10) NOT NULL,
    `code` varchar(16),
    `descr` varchar(48),
    `fnumb` varchar(8),
    `nrooms` float,
    `sold` tinyint not null default 0,
    `contractid` INT(10) UNSIGNED NOT NULL,
    `meterprice` float,
    `price` float,
    `studio` tinyint not null default 0,
    `cottage` tinyint not null default 0,
    `plot` varchar (255),
    `gensqplan` float,
    `lifesqplan` float,
    `nosell` tinyint not null default 0,
    `pledge` tinyint not null default 0,
    `flattype` tinyint not null default 0,
    `bph` tinyint not null default 0,
    PRIMARY KEY (`id`),
    INDEX `FK__objects_f` (`objectid`),
    CONSTRAINT `FK__objects_f` FOREIGN KEY (`objectid`) REFERENCES `objects` (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

