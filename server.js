const express = require("express");
const app = express();

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const validateMethod = (req, res, next) => {
  if (
    req.method === "GET" ||
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "DELETE"
  ) {
    next();
  } else {
    res.status(405).send("Método HTTP no permitido");
  }
};
app.use(validateMethod);

app.use(express.json());

app.use("/tasks/view", listViewRouter);
app.use("/tasks/edit", listEditRouter);

app.post("/login");

const port = 5000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});