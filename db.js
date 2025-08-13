import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
Primero, importamos el paquete mysql2/promise para poder trabajar de manera asíncrona con la base de datos. 
También importamos el paquete dotenv para cargar las variables de entorno desde un archivo .env.

export const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

Aquí se crea un pool de conexiones a la base de datos utilizando mysql.createPool(). Los valores de las variables de entorno se obtienen a través de process.env, que fueron cargados por dotenv.config().

Veo cada una de las opciones de configuración:

host: la dirección del servidor de la base de datos.
user: el nombre de usuario para acceder a la base de datos.
password: la contraseña para acceder a la base de datos.
database: el nombre de la base de datos a la que se va a conectar.
port: el número de puerto para la conexión a la base de datos.
waitForConnections: indica si se debe esperar a que haya una conexión disponible en el pool.
connectionLimit: el número máximo de conexiones que se pueden mantener en el pool.
queueLimit: el número máximo de solicitudes que se pueden poner en cola si no hay conexiones disponibles.
Finalmente, se exporta el objeto connection para que pueda ser utilizado en otras partes de la aplicación.
