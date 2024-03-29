import express from 'express';
import { getAllTodoList, getTodoByName, createTodo, getTodoById, deleteTodoById, updateTodoById, changeStatusTodo } from '../controller/todoController.js';

const router = express.Router();

router.get("/todoList", getAllTodoList);
router.get("/todoList/:name", getTodoByName);
router.post("/createTodo", createTodo);
router.get("/getByID/:id", getTodoById);
router.delete("/delete/:id", deleteTodoById);
router.patch("/update/:id", updateTodoById);
router.patch("/status/:id",changeStatusTodo);
export default router;
