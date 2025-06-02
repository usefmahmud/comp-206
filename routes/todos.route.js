import { Router } from "express";
import { getRandomId } from "../utils/random.js";

let todos = [];

const router = Router();

router.post("/", (req, res) => {
  const id = getRandomId();
  const content = req.body.content;
  const userId = req.session.userId;

  const todo = {
    id,
    content,
    userId,
  };

  todos.push(todo);

  res.status(201).json({
    message: "new todo is added successfully",
    todo: todo,
  });
});

router.get("/", (req, res) => {
  const userId = req.session.userId;
  const userTodos = todos.filter((todo) => todo.userId === userId);
  res.json({
    todos: userTodos,
  });
});

router.get("/:id", (req, res) => {
  const todoId = req.params.id;
  const userId = req.session.userId;
  const foundTodo = todos.find(
    (todo) => todo.id === +todoId && todo.userId === userId
  ); // todo - undefined

  if (foundTodo) {
    res.status(200).json({
      todo: foundTodo,
    });
  } else {
    res.status(404).json({
      error_message: "not found todo",
    });
  }
});

router.delete("/:id", (req, res) => {
  const todoId = req.params.id;
  const userId = req.session.userId;
  const foundTodo = todos.find(
    (todo) => todo.id === +todoId && todo.userId === userId
  );

  if (foundTodo) {
    todos = todos.filter((todo) => todo.id !== foundTodo.id);
    res.status(201).json({
      message: "todo is removed",
    });
  } else {
    res.status(404).json({
      error_message: "not found todo",
    });
  }
});

export default router;
