const express = require("express");
const listEditRouter = express.Router();

let tasks = [
  { id: "123456", isCompleted: false, description: "Walk the dog" },
  { id: "789012", isCompleted: true, description: "Buy groceries" },
  { id: "345678", isCompleted: false, description: "Read a book" },
];

listEditRouter.post("/", (req, res) => {
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
listEditRouter.put("/:id", (req, res) => {
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