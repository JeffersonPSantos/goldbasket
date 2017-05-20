CREATE TABLE shares (
    id_share int(5) NOT NULL AUTO_INCREMENT,
    ticker varchar(7) NOT NULL,
    company_name varchar(255) DEFAULT NULL,
    sector varchar(255) DEFAULT NULL,
    PRIMARY KEY (id_share)
);

CREATE TABLE buy_shares (
id_buy_share int(10) NOT NULL AUTO_INCREMENT,
date_buy date DEFAULT NULL,
price decimal (10,4) DEFAULT NULL,
quantity int(11) DEFAULT NULL,
cost_basis decimal(10,4) DEFAULT NULL,
mkt_value decimal(10,4) DEFAULT NULL,
gain_cash decimal(10,4) DEFAULT NULL,
overall_return decimal(10,4) DEFAULT NULL,
weight int(3) DEFAULT NULL,
id_share int(5) DEFAULT NULL,
PRIMARY KEY (id_buy_share),
FOREIGN KEY (id_share) REFERENCES shares(id_share)
);

CREATE VIEW shares_wallet AS
SELECT shares.ticker, shares.company_name, shares.sector, buy_shares.date_buy, buy_shares.price, buy_shares.quantity, buy_shares.cost_basis, buy_shares.mkt_value, buy_shares.gain_cash, buy_shares.overall_return, buy_shares.weight
FROM shares INNER JOIN buy_shares
ON shares.id_share = buy_shares.id_share;
