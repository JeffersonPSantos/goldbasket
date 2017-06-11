CREATE TABLE shares (
    ticker varchar(10) NOT NULL,
    company_name varchar(255) DEFAULT NULL,
    sector varchar(255) DEFAULT NULL,
    PRIMARY KEY (ticker)
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

CREATE TABLE shares_transaction (
    id_transaction int(10) NOT NULL AUTO_INCREMENT,
    type varchar(5) DEFAULT NULL,
    ticker varchar(10) DEFAULT NULL,
    date date DEFAULT NULL,
    price decimal(10,4) DEFAULT NULL,
    quantity int(11) DEFAULT NULL,
    total_value decimal(10,4) DEFAULT NULL,
    cost decimal(8,4) DEFAULT NULL,
    brokerage decimal(8,4) DEFAULT NULL,
    PRIMARY KEY (id_transaction),
    FOREIGN KEY (ticker) REFERENCES shares(ticker)
);

CREATE TABLE stocks_test (
    ticker varchar(10) DEFAULT NULL,
    price decimal(10,4) DEFAULT NULL,
    quantity int(11) DEFAULT NULL,
    total_value decimal(10,4) DEFAULT NULL,
    cost decimal(8,4) DEFAULT NULL,
);

CREATE TABLE stocks_test (
    quantity int(11) DEFAULT NULL
);

insert into stocks_test select sum(quantity) as qtd from shares_transaction where ticker = 'AFLU5'
