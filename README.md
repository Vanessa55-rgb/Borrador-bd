# Database
- Host: bl15tugvj0fcvaicvrrb-mysql.
- services.clever-cloud.com
- DB: bl15tugvj0fcvaicvrrb
- User: u8hn3abi0g9ndnha
- Password: PgYx0aOc8W0EigLPt1AW
- Port: 3306

**Tables:**
- Customers.
- Platforms.
- Transaction Status.
- Transactions. 
- Invoices.

---

# Bulk Load
Convert .xlsx to .csv and execute:
```sql
LOAD DATA LOCAL INPUT FILE 'Customers.csv'
INTO TABLE Customers
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINE
(name, ID, address, phone number, email);
```

# Backend
```
back of CD
npm install
npm start
```

```
back of CD
node./server.js
```

---

# Frontend

Open frontend/index.html in your browser.
Manage clients and view reports.

# Autor
**Vanessa Gomez Lopez**