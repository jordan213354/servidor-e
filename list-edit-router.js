const express = require("express");

const listEditRouter = express.Router();

function errorSolicitud(req, res, next) {
  if (req.method === "POST" && Object.keys(req.body).length === 0) {
    return res.status(400).send("el cuerpo de la solicitud esta vacio");
  }
  if (req.method === "POST") {
    const { id, description, completed } = req.body;
    if (!id || !description || !completed === undefined) {
      return res.status(400).send("informacion no valida");
    }
  }
  if (req.method === "PUT" && Object.keys(req.body).length === 0) {
    return res.status(400).send("el cuerpo de la solicitud esta vacio");
  }
  if (req.method === "PUT") {
    const { id, description, completed } = req.body;
    if (!id || !description || !completed === undefined) {
      return res.status(400).send("informacion no valida");
    }
  }
  next();
}

let tasks = [
  { id: "123456", isCompleted: false, description: "pasear al perro" },
  { id: "789012", isCompleted: true, description: "hacer las compras" },
  { id: "345678", isCompleted: false, description: "aprender java" },
];

// Ruta para crear una nueva tarea (solicitud POST)
listEditRouter.post("/", errorSolicitud, (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(tasks);
});

// Ruta para eliminar una tarea (solicitud DELETE)
listEditRouter.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json(tasks);
});

// Ruta para actualizar una tarea (solicitud UPDATE)
listEditRouter.put("/:id", errorSolicitud, (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, ...updatedTask };
    }
    return task;
  });
  res.json(tasks);
});

module.exports = listEditRouter;