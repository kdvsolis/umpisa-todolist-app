var AccountService = require('../../services/account.service');

class UserController {
    constructor() {
        this.accountService = new AccountService();
    }

    async addUser(req, res) {
        try{
            let userInfo = await this.accountService.addUser(req.body);
            res.status(userInfo.code > -1? 200 : 400).send(userInfo.code > -1? { success: true, result: userInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async loginUser(req, res) {
        try{
            let userInfo = await this.accountService.loginUser(req.body.username, req.body.password);
            res.status(userInfo.code > -1? 200 : 400).send(userInfo.code > -1? { success: true, result: userInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async editUser(req, res) {
        try{
            let userInfo = await this.accountService.editUser(req.user_id, req.body);
            res.status(userInfo.code > -1? 200 : 400).send(userInfo.code > -1? { success: true, result: userInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async getUser(req, res) {
        try{
            let userInfo = await this.accountService.getUser(req.user_id);
            res.status(userInfo.code > -1? 200 : 400).send(userInfo.code > -1? { success: true, result: userInfo } : { success: false, reason: "Bad Request" });
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }
}

const userController = new UserController();

module.exports = userController;
