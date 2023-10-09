import api_fetch  from "../utils/api_fetch"
import { storageHandler } from '../utils/storage_handler';
const account = {
    register: async function(body){
        return (await (api_fetch.post(`/v1/add-user`, {}, {}, "", body))).json();
    },
    login: async function(body){
        return (await (api_fetch.post(`/v1/login-user`, {}, {}, "", body))).json();
    },
    updateUser: async function(body){
        return (await (api_fetch.put(`/v1/modify-user`, {
            "Authorization": `Bearer ${storageHandler.localStorageGet('token')}`
        }, {}, "", body))).json();
    },
    getUser: async function(){
        return (await (api_fetch.get(`/v1/get-user`, {
            "Authorization": `Bearer ${storageHandler.localStorageGet('token')}`
        }, {}, "", {}))).json();
    }    
}
export default account;