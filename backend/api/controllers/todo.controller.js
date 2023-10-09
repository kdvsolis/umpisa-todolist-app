"use strict"

var TodoService = require('../../services/todo.service');

class TodoController {
    constructor() {
        this.todoService = new TodoService();
    }

    async addTodo(req, res) {
        try{
            let todoInfo = await this.todoService.addTodo(req.body);
            res.status(200).send(todoInfo.code > -1? { success: true, result: todoInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async getTodos(req, res) {
        try{
            let todos = await this.todoService.getTodos(req.body.user_id);
            res.status(200).send(todos.code > -1? { success: true, result: todos } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async updateTodo(req, res) {
        try{
            let todoInfo = await this.todoService.updateTodo(req.params.todo_id, req.body);
            res.status(200).send(todoInfo.code > -1? { success: true, result: todoInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async deleteTodo(req, res) {
        try{
            let todoInfo = await this.todoService.deleteTodo(req.params.todo_id);
            res.status(200).send(todoInfo.code > -1? { success: true, result: todoInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }
}

const todoController = new TodoController();

module.exports = todoController;
