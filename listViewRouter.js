const express = require("express");
const listViewRouter = express.Router();

const tasks = [
  { id: "123456", isCompleted: false, description: "Aprender react" },
  { id: "789012", isCompleted: true, description: "Pasear al perro" },
  { id: "345678", isCompleted: false, description: "Aprender ingles" },
];

// Ruta para listar las tareas completas
listViewRouter.get("/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  res.json(completedTasks);
});

// Ruta para listar las tareas incompletas
listViewRouter.get("/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;