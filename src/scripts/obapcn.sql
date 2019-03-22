CREATE TABLE IF NOT EXISTS `codes` (
  `ai` varchar(128) DEFAULT NULL,
  `ac` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `pgentypes` (
    `id` INT(10) UNSIGNED NOT NULL,
    `name` VARCHAR(48) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `parttypes` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(48) NOT NULL DEFAULT '0',
    `pgentypeid`  INT(10) UNSIGNED NOT NULL,
    `code1c` INT(10),
    `forlife`  tinyint not null default 0,
    PRIMARY KEY (`id`),
    INDEX `FK__ps_pgentypes` (`pgentypeid`),
    CONSTRAINT `FK__ps_pgentypes` FOREIGN KEY (`pgentypeid`) REFERENCES `pgentypes` (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `objects` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL DEFAULT '0',
    `code1c` VARCHAR(14) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `c1c_unq` (`code1c`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `floors` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `objectid` INT(10) UNSIGNED NOT NULL,
    `floornum` INT(10) NOT NULL,
    `plot` varchar (255),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `on_unk` (`objectid`, `floornum`),
    INDEX `FK__objects` (`objectid`),
    CONSTRAINT `FK__objects` FOREIGN KEY (`objectid`) REFERENCES `objects` (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `flats` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `objectid` INT(10) UNSIGNED NOT NULL,
    `floorid` INT(10) UNSIGNED NOT NULL,
    `code` varchar(16),
    `descr` varchar(48),
    `fnumb` varchar(8),
    `nrooms` float,
    `square` float,
    `gensquare` float,
    `sold` tinyint not null default 0,
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
    `Pointsatfloor` MULTIPOINT NULL DEFAULT NULL,
    `deal_id` INT(11) NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `flat_unq` (`objectid`, `floorid`, `fnumb`),
    INDEX `FK__objects_f` (`objectid`),
    INDEX `FK__floor_f` (`floorid`),
    CONSTRAINT `FK__objects_f` FOREIGN KEY (`objectid`) REFERENCES `objects` (`id`),
    CONSTRAINT `FK__floor_f` FOREIGN KEY (`floorid`) REFERENCES `floors` (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `contracts` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `flatid` INT(10) UNSIGNED NOT NULL DEFAULT '0',
    `regnum` VARCHAR(500) NULL DEFAULT '0',
    `regdate` DATE NULL DEFAULT NULL,
    `client` VARCHAR(100) NULL DEFAULT '0',
    `summ` FLOAT NULL DEFAULT '0',
    `firstpay` FLOAT NULL DEFAULT '0',
    `paytype` VARCHAR(150) NULL DEFAULT '0',
    `varianto` VARCHAR(150) NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    INDEX `FK1_ctr_fl` (`flatid`),
    CONSTRAINT `FK1_ctr_fl` FOREIGN KEY (`flatid`) REFERENCES `flats` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `partsquares` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `parttypeid` INT(10) UNSIGNED NOT NULL,
    `fid` INT(10) UNSIGNED NOT NULL,
    `square` float,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `pt_unq` (`parttypeid`, `fid`),
    INDEX `FK__ps_ptypes` (`parttypeid`),
    INDEX `FK__ps_flats` (`fid`),
    CONSTRAINT `FK__ps_ptypes` FOREIGN KEY (`parttypeid`) REFERENCES `parttypes` (`id`),
    CONSTRAINT `FK__ps_flats` FOREIGN KEY (`fid`) REFERENCES `flats` (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `payshedules` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `contractid` INT(10) UNSIGNED NOT NULL DEFAULT '0',
    `pdate` DATE NOT NULL,
    `psumm` FLOAT NOT NULL DEFAULT '0',
    `percent` SMALLINT(6) NULL DEFAULT '0',
    `pmethod` VARCHAR(100) NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    INDEX `FK1_ps_cntr` (`contractid`),
    CONSTRAINT `FK1_ps_cntr` FOREIGN KEY (`contractid`) REFERENCES `contracts` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
