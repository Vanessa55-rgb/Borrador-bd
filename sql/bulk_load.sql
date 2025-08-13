USE bl15tugvj0fcvaicvrrb;


-- Enable local file upload
SET GLOBAL local_infile = 1;

-- Temporarily disable foreign key validations
SET FOREIGN_KEY_CHECKS = 0;

-- Load data into TransactionStatus
LOAD DATA LOCAL INFILE 'C:/PruebaBD/data/TransactionStatus.csv'
INTO TABLE TransactionStatus
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(status_id, status_name);

-- Loading data into Platforms
LOAD DATA LOCAL INFILE 'C:/PruebaBD/data/Platform.csv'
INTO TABLE Platforms
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(platform_id, platform_name);

-- Load data into Customers
LOAD DATA LOCAL INFILE 'C:/PruebaBD/data/Custormers.csv'
INTO TABLE Customers
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(customer_id, name, identification, address, phone_number, email);

-- Loading data into Transactions
LOAD DATA LOCAL INFILE 'C:/PruebaBD/data/Transaction.csv'
INTO TABLE Transactions
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(transaction_id, status_id, transaction_datetime, transaction_amount);

-- Loading data into Invoices
LOAD DATA LOCAL INFILE 'C:/PruebaBD/data/Invoices.csv'
INTO TABLE Invoices
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(invoice_id, customer_id, platform_id, transaction_id, billing_number, billing_period, billed_amount, paid_amount);

-- Reactivate validations
SET FOREIGN_KEY_CHECKS = 1;