import express from "express";
import { body, validationResult } from "express-validator";
import { connection } from "../db.js";

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  const [rows] = await connection.query("SELECT * FROM Customers");
  res.json(rows);
});

// GET customer by ID
router.get("/:id", async (req, res) => {
  const [rows] = await connection.query(
    "SELECT * FROM Customers WHERE customer_id = ?",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

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

// DELETE customer
router.delete("/:id", async (req, res) => {
  await connection.query("DELETE FROM Customers WHERE customer_id=?", [req.params.id]);
  res.json({ message: "Customer deleted" });
});

export default router;