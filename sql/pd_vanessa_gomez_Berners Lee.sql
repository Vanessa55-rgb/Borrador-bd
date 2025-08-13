USE bl15tugvj0fcvaicvrrb;

-- 1. Table Customers
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    identification VARCHAR(50) NOT NULL UNIQUE,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(100)
);

-- 2. Table Platforms
CREATE TABLE Platforms (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    platform_name VARCHAR(100) NOT NULL
);

-- 3. Table TransactionStatus
CREATE TABLE TransactionStatus (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) NOT NULL
);

-- 4. Tabla Transactions
CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    status_id INT NOT NULL,
    transaction_datetime DATETIME NOT NULL,
    transaction_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (status_id) REFERENCES TransactionStatus(status_id)
);

-- 5. Table Invoices 
CREATE TABLE Invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    platform_id INT NOT NULL,
    transaction_id INT NOT NULL,
    billing_number VARCHAR(50) NOT NULL UNIQUE,
    billing_period VARCHAR(20),
    billed_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (platform_id) REFERENCES Platforms(platform_id),
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id)
);
