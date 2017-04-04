CREATE TABLE IF NOT EXISTS company (
    id INT(11) AUTO_INCREMENT,
    pastRank VARCHAR(11) DEFAULT NULL,
    Name VARCHAR(45) DEFAULT NULL,
    City VARCHAR(45) DEFAULT NULL,
    State VARCHAR(45) DEFAULT NULL,
    zipCode VARCHAR(45) DEFAULT NULL,
    latitude VARCHAR(45) DEFAULT NULL,
    longitude VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (id)
);