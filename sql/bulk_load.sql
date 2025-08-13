USE bl15tugvj0fcvaicvrrb;
Se selecciona la base de datos bl15tugvj0fcvaicvrrb para realizar las operaciones.

-- Enable local file upload
SET GLOBAL local_infile = 1;

Se habilita la opción de carga de archivos locales (local_infile) para permitir la carga de archivos 
desde el sistema de archivos local.

-- Temporarily disable foreign key validations
SET FOREIGN_KEY_CHECKS = 0;
Se deshabilita temporalmente la validación de claves foráneas para evitar errores al cargar los datos.

-- Load data into TransactionStatus
LOAD DATA LOCAL INFILE 'C:/PruebaBD/data/TransactionStatus.csv'
INTO TABLE TransactionStatus
FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(status_id, status_name);
Se carga los datos de la tabla TransactionStatus desde el archivo TransactionStatus.csv en el directorio C:/PruebaBD/data. Se especifican las siguientes opciones:

FIELDS TERMINATED BY ',': los campos están separados por comas.
ENCLOSED BY '"': los campos están rodeados de comillas dobles.
LINES TERMINATED BY '\n': las líneas están separadas por saltos de línea.
IGNORE 1 ROWS: se ignoran las primeras filas del archivo (probablemente el encabezado).
status_id, status_name: se especifican los nombres de las columnas a cargar.
Se repite este patrón para las otras tablas:
  
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
Finalmente, se reactiva la validación de claves foráneas:
  
-- Reactivate validations
SET FOREIGN_KEY_CHECKS = 1;
Esto asegura que las claves foráneas estén activadas después de cargar los datos.
