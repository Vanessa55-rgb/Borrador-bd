import express from "express";
import cors from "cors";
import customersRouter from "./routes/customers.js";
import dotenv from "dotenv";
express → Framework para crear un servidor HTTP.
cors → Middleware para habilitar el acceso desde otros dominios.
customersRouter → Archivo donde tienes definidas las rutas relacionadas con “clientes”.
dotenv → Carga variables de entorno desde un archivo .env (por ejemplo, PORT, DB_USER, etc.).
  
dotenv.config();
Busca un archivo .env en la raíz y carga sus valores en process.env.

const app = express();
Crea una instancia de la aplicación Express.
  
app.use(cors());
app.use(express.json());
cors() → Permite que cualquier cliente (por ejemplo, una página web en otro dominio) haga peticiones a tu API.
express.json() → Convierte automáticamente el body de las peticiones en un objeto JavaScript cuando el contenido es JSON.


app.use("/customers", customersRouter);
Todo lo que empiece con /customers se maneja con el router que importaste (customersRouter).
Por ejemplo:
GET /customers
POST /customers
PUT /customers/:id


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
PORT → Toma el puerto desde variables de entorno o usa 3000 por defecto.
app.listen(...) → Inicia el servidor y lo deja “escuchando” peticiones.
