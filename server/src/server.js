const express = require('express');
// const todoController = require("./todo/todo.controller");
const cors = require("cors");
const PORT = process.env.PORT || 5100;
const app = express();
// const db = require("../db")

app.use(express.json());
app.use(cors());

app.use("/", express.static(__dirname + "/public"));

// app.get("/", todoController.getTodos); //done
// app.get("/:id", todoController.getTodos); //done
// app.post("/", todoController.create); //done returning msg with id
// app.put("/:id", todoController.update); //done returning msg with id
// app.delete("/:id", todoController.delete); //done returning msg with id

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})