"use strict"

const db = require('./db.service');

class Todo {

    constructor() {
        //This is intentional
    }

    async addTodo(body){
        let addTodoResponse = await db.up_todolist.create(body);
        if(addTodoResponse != null){
            return {
                "code": 0,
                "type": "todo",
                "message": "success",
                "data": addTodoResponse
            }
        } else {
            return {
                "code": -1,
                "type": "todo",
                "message": "fail"
            }
        }
    }

    async getTodos(user_id){
        let todos = await db.up_todolist.findAll({ where: { user_id: user_id } });
        if(todos != null){
            return {
                "code": 0,
                "type": "todo",
                "message": "success",
                "data": todos
            }
        } else {
            return {
                "code": -1,
                "type": "todo",
                "message": "fail"
            }
        }
    }

    async updateTodo(todo_id, body){
        let updateResponse = await db.up_todolist.update(body, { where: { id: todo_id } });
        if(updateResponse != null){
            return {
                "code": 0,
                "type": "todo",
                "message": "success"
            }
        } else {
            return {
                "code": -1,
                "type": "todo",
                "message": "fail"
            }
        }
    }

    async deleteTodo(todo_id){
        let deleteResponse = await db.up_todolist.destroy({ where: { id: todo_id } });
        if(deleteResponse != null){
            return {
                "code": 0,
                "type": "todo",
                "message": "success"
            }
        } else {
            return {
                "code": -1,
                "type": "todo",
                "message": "fail"
            }
        }
    }

}

module.exports = Todo;
