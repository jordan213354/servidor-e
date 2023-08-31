const express = require("express");
const listViewRouter = express.Router();

const tasks = [
  { id: "123456", isCompleted: false, description: "Walk the dog" },
  { id: "789012", isCompleted: true, description: "Buy groceries" },
  { id: "345678", isCompleted: false, description: "Read a book" },
];
function verificarParametros(req, res, next) {
  const { tipo } = req.query;

  if (!tipo || (tipo !== "completas" && tipo !== "incompletas")) {
    return res.status(400).send("Parámetros incorrectos");
  }
  next();
}
// Ruta para listar las tareas completas
listViewRouter.get("/completed", verificarParametros, (req, res) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  res.json(completedTasks);
});

// Ruta para listar las tareas incompletas
listViewRouter.get("/incomplete", verificarParametros, (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;