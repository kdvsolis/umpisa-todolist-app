import api_fetch  from "../utils/api_fetch"
import { storageHandler } from '../utils/storage_handler';

const todo = {
    addTodo: async function(body){
        return (await (api_fetch.post(`/v1/add-todo`, {
            "Authorization": `Bearer ${storageHandler.localStorageGet('token')}`
        }, {}, "", body))).json();
    },
    getTodos: async function(){
        return (await (api_fetch.get(`/v1/get-todos`, {
            "Authorization": `Bearer ${storageHandler.localStorageGet('token')}`
        }, {}, "", {}))).json();
    },
    updateTodo: async function(todo_id, body){
        return (await (api_fetch.put(`/v1/update-todo/${todo_id}`, {
            "Authorization": `Bearer ${storageHandler.localStorageGet('token')}`
        }, {}, "", body))).json();
    },
    deleteTodo: async function(todo_id){
        return (await (api_fetch.delete(`/v1/delete-todo/${todo_id}`, {
            "Authorization": `Bearer ${storageHandler.localStorageGet('token')}`
        }, {}, "", {}))).json();
    }
}

export default todo;
