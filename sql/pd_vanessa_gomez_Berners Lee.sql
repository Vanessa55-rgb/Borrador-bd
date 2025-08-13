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
Esta tabla almacena información de clientes. Cada fila representa un cliente y tiene los siguientes campos:

customer_id: el identificador único del cliente, autoincrementado.
name: el nombre del cliente,

-- 2. Table Platforms
CREATE TABLE Platforms (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    platform_name VARCHAR(100) NOT NULL
);
Esta tabla almacena información sobre las plataformas en las que se realizan las transacciones. Cada fila representa una plataforma y tiene los siguientes campos:

platform_id: el identificador único de la plataforma, autoincrementado.
platform_name: el nombre de la plataforma.

-- 3. Table TransactionStatus
CREATE TABLE TransactionStatus (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) NOT NULL
);
Esta tabla almacena los diferentes estados posibles de una transacción. Cada fila representa un estado de transacción y tiene los siguientes campos:

status_id: el identificador único del estado de transacción, autoincrementado.
status_name: el nombre del estado de transacción.

-- 4. Tabla Transactions
CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    status_id INT NOT NULL,
    transaction_datetime DATETIME NOT NULL,
    transaction_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (status_id) REFERENCES TransactionStatus(status_id)
);
Esta tabla almacena información sobre las transacciones realizadas. Cada fila representa una transacción y tiene los siguientes campos:

transaction_id: el identificador único de la transacción, autoincrementado.
status_id: el identificador del estado de la transacción, que se relaciona con la tabla TransactionStatus.
transaction_datetime: la fecha y hora en que se realizó la transacción.
transaction_amount: el monto de la transacción.
    
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
Esta tabla almacena información sobre las facturas generadas a partir de las transacciones. Cada fila representa una factura y tiene los siguientes campos:

invoice_id: el identificador único de la factura, autoincrementado.
customer_id: el identificador del cliente al que se le emitió la factura, que se relaciona con la tabla Customers.
platform_id: el identificador de la plataforma en la que se realizó la transacción, que se relaciona con la tabla Platforms.
transaction_id: el identificador de la transacción que generó la factura, que se relaciona con la tabla Transactions.
billing_number: el número de factura, único.
billing_period: el período de facturación.
billed_amount: el monto facturado.
paid_amount: el monto pagado de la factura.
