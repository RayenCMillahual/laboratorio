const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos simulados (array en memoria)
let items = [
  { id: 1, name: "Primer elemento" },
  { id: 2, name: "Segundo elemento" },
];

app.get("/items", (req, res) => {
  res.json(items);
});

// Crear un nuevo elemento
app.post("/items", (req, res) => {
  const { name } = req.body; // Extrae el nombre desde el cuerpo de la solicitud
  if (!name) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }
  const newItem = { id: Date.now(), name }; // Usa Date.now() para crear un id único
  items.push(newItem);
  res.status(201).json(newItem);
});


// Actualizar un elemento existente
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  items = items.map((item) => (item.id === parseInt(id) ? { ...item, ...updatedItem } : item));
  res.json(updatedItem);
});

// Eliminar un elemento
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== parseInt(id));
  res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
