import express from "express";
import { body, validationResult } from "express-validator";
import { connection } from "../db.js";
const router = express.Router();
Importo las bibliotecas necesarias: express para crear el enrutador, 
express-validator para validar los datos de entrada y 
connection para acceder a la base de datos.

// GET all customers
router.get("/", async (req, res) => {
  const [rows] = await connection.query("SELECT * FROM Customers");
  res.json(rows);
});

Esta ruta maneja las solicitudes GET a /customers. 
Realiza una consulta SQL para obtener todos los clientes de la tabla "Customers" y 
envía los resultados en formato JSON.

// GET customer by ID
router.get("/:id", async (req, res) => {
  const [rows] = await connection.query(
    "SELECT * FROM Customers WHERE customer_id = ?",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});
Esta ruta maneja las solicitudes GET a /customers/:id. 
Realiza una consulta SQL para obtener los datos del cliente con el ID proporcionado en la URL. 
Si no se encuentra el cliente, devuelve un error 404 "Not found". 
De lo contrario, envía los datos del cliente en formato JSON.
  
// CREATE customer
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("identification").notEmpty().withMessage("Identification required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, identification, address, phone_number, email } = req.body;
    await connection.query(
      "INSERT INTO Customers (name, identification, address, phone_number, email) VALUES (?, ?, ?, ?, ?)",
      [name, identification, address, phone_number, email]
    );
    res.json({ message: "Customer added" });
  }
);
Esta ruta maneja las solicitudes POST a /customers. 
Utiliza el middleware express-validator para validar los campos del cuerpo de la solicitud: 
name es obligatorio, email debe ser válido y identification es obligatorio. 
Si hay errores de validación, devuelve un error 400 con los detalles de los errores. 
Si la validación es exitosa, inserta los datos del cliente en la tabla "Customers" y 
envía una respuesta JSON con un mensaje de éxito.

// UPDATE customer
router.put("/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("identification").notEmpty().withMessage("Identification required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, identification, address, phone_number, email } = req.body;
    await connection.query(
      "UPDATE Customers SET name=?, identification=?, address=?, phone_number=?, email=? WHERE customer_id=?",
      [name, identification, address, phone_number, email, req.params.id]
    );
    res.json({ message: "Customer updated" });
  }
);
Esta ruta maneja las solicitudes PUT a /customers/:id. 
Al igual que la ruta de creación, utiliza express-validator para 
validar los campos del cuerpo de la solicitud. Si la validación es exitosa, actualiza los datos del cliente en la tabla "Customers" y envía una respuesta JSON con un mensaje de éxito.

// DELETE customer
router.delete("/:id", async (req, res) => {
  await connection.query("DELETE FROM Customers WHERE customer_id=?", [req.params.id]);
  res.json({ message: "Customer deleted" });
});
Esta ruta maneja las solicitudes DELETE a /customers/:id. 
Elimina el registro del cliente con el ID proporcionado en la URL de la tabla "Customers" y 
envía una respuesta JSON con un mensaje de éxito.
  
export default router;
Finalmente, exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
