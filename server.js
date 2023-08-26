const express = require("express");
const app = express();

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.use(express.json());

app.use("/tasks/view", listViewRouter);
app.use("/tasks/edit", listEditRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});