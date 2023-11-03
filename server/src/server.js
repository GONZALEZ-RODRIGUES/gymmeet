const express = require('express');
// const todoController = require("./todo/todo.controller");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5100;

// app.get("/", todoController.getTodos); //done
// app.get("/:id", todoController.getTodos); //done
// app.post("/", todoController.create); //done returning msg with id
// app.put("/:id", todoController.update); //done returning msg with id
// app.delete("/:id", todoController.delete); //done returning msg with id

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})