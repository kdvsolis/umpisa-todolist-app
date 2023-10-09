const express = require('express');
const todoController = require('../api/controllers/todo.controller');
const { validateToken } = require('../middlewares/validate-access-token.middleware');

const apiTodo = express.Router();

apiTodo.post('/add-todo', validateToken, async (req, res) => todoController.addTodo(req, res));
apiTodo.get('/get-todos', validateToken, async (req, res) => todoController.getTodos(req, res));
apiTodo.put('/update-todo/:todo_id', validateToken, async (req, res) => todoController.updateTodo(req, res));
apiTodo.delete('/delete-todo/:todo_id', validateToken, async (req, res) => todoController.deleteTodo(req, res));

module.exports = apiTodo;
