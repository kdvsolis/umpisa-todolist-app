const express = require('express');
const userController = require('../api/controllers/user.controller');
const { validateToken } = require('../middlewares/validate-access-token.middleware');

const apiUser = express.Router();

apiUser.post('/add-user', async (req, res) => userController.addUser(req, res));
apiUser.post('/login-user', async (req, res) => userController.loginUser(req, res));
apiUser.put('/modify-user', validateToken, async (req, res) => userController.editUser(req, res));
apiUser.get('/get-user', validateToken, async (req, res) => userController.getUser(req, res));

module.exports = apiUser;
