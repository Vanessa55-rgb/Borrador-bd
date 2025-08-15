/**
 * Proyecto: PruebaBD - Sustentación de Entrega
 * 
 * Contexto:
 * Prueba de Desempeño M4 - Bases de Datos SQL
 * Cliente: ExpertSoft (sector eléctrico, Colombia)
 * Objetivo: Tomar datos financieros desordenados (Nequi, Daviplata) y normalizarlos, cargarlos en una base SQL
 *           y crear un sistema CRUD con consultas avanzadas.
 * 
 * --------------------------------------------------------------------------------
 * 📋 Requisitos según el enunciado:
 * --------------------------------------------------------------------------------
 * 1. Normalizar los datos (1FN, 2FN, 3FN) y hacer modelo relacional (imagen/PDF).
 * 2. Crear base de datos con script DDL (nombres en inglés, llaves, restricciones).
 * 3. Convertir Excel a CSV y realizar carga masiva en la base de datos.
 * 4. Desarrollar CRUD para una entidad (API Express).
 * 5. Crear frontend sencillo para el CRUD.
 * 6. Hacer 3 consultas avanzadas y probar todo en Postman.
 * 7. Entregar README documentado en inglés.
 * 8. (Opcional) Hacer carga masiva vía endpoint.
 * 
 * --------------------------------------------------------------------------------
 * ✅ Qué hice:
 * --------------------------------------------------------------------------------
 * - Realicé la normalización hasta 3FN y generé el modelo relacional (`docs/modelo_relacional.drawio.png`).
 * 📌 Tabla fuerte en el modelo:
 * 
 * - La tabla fuerte es **Invoices**.
 * - Motivo:
 *   - Representa el hecho principal que se quiere registrar: la factura emitida/pagada.
 *   - Tiene su propia clave primaria (`invoice_id`).
 *   - Se relaciona con:
 *       > Customers (quién recibe o paga la factura)
 *       > Platforms (por dónde se paga: Nequi, Daviplata, etc.)
 *       > Transactions (el movimiento financiero asociado)
 *   - Las demás tablas (Customers, Platforms, TransactionStatus) son de soporte o catálogo.
 
 * - En el CRUD implementado no se trabajó sobre Invoices, sino sobre Customers, pero
 *   Invoices sigue siendo la tabla central para consultas avanzadas.

 * - Creé el script DDL (`sql/pd_vanessa_gomez_Berners Lee.sql`) con tablas y relaciones.

 * - Preparé archivos CSV (`data/...`) con la información separada.

 * - Programé el CRUD de la entidad Customers en Express (`backend/routes/customers.js`).

 * - Desarrollé un frontend básico (`fronted/index.html`, `fronted/script.js`).

 * 
 * --------------------------------------------------------------------------------
 * ⚠️ Qué intenté pero no funciona:
 * --------------------------------------------------------------------------------
   - npm install express mysql2 cors dotenv 
   
   - Cambiar nombre modelo relacional rm

   - correcccion archivo .env PORT=3306 a  PORT=3000
    añadir esto a la linea y poner DB_PORT=3306
DB_HOST=bl15tugvj0fcvaicvrrb-mysql.services.clever-cloud.com
DB_USER=u8hn3abi0g9ndnha
DB_PASSWORD=PgYx0aOc8W0EigLPt1AW
DB_NAME=bl15tugvj0fcvaicvrrb
DB_PORT=3306
PORT=3000

db.js
cambiar linea 8 y 10
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


 * - Frontend CRUD: tiene errores de mala dos errores de mala ortografia, la carpeta es fronted y el espacio en el index script.js
     la página HTML no logra conectarse al backend por error en `localhost`
 *   (probable problema de puertos o configuración CORS).
      el error esta index    <script src="./script.js"></script>
      cambiar el nombre por main.js

 main.js o script.js 
 linea 1  const API_URL = "http://localhost:3000";
 linea 4 const res = await fetch(`${API_URL}/customers/`);
 linea 37    await fetch(API_URL, "/customers/postCustomers", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(customer) });
 
   - SQL poner SHOW TABLES; para mostrarle a el que si las hice 
   
 * - Carga masiva desde CSV: hice script `sql/bulk_load.sql`, pero al ejecutarlo MySQL no insertó los datos
 *   (posibles problemas de ruta, permisos o sintaxis).



 * - CRUD API: implementado, pero sin poder probar completo por el error de conexión anterior
 
 
 * - El archivo server.js es el que lo arranca y lo expone en un puerto.
 * 
 * --------------------------------------------------------------------------------
 * ❌ Qué no hice:
 * --------------------------------------------------------------------------------
 * - No incluí las consultas avanzadas pedidas:
 *   1. Total pagado por cliente.
 * 
 *   2. Facturas pendientes con cliente y transacción.
 * 
 *   3. Transacciones por plataforma.
 * 
 * - No preparé la colección Postman con endpoints del CRUD y consultas avanzadas.
 * 
 * --------------------------------------------------------------------------------
 * 🛠 Observaciones técnicas:
 * --------------------------------------------------------------------------------
 * - El fallo en el frontend/CRUD se debe a que el fetch apunta a `localhost` sin configuración adecuada.
 * - La carga masiva probablemente requiere habilitar `LOAD DATA LOCAL INFILE` y ajustar rutas absolutas.
 * - Falta explicar el proceso de normalización en el README y adjuntar capturas.
 

