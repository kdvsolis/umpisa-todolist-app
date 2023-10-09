"use strict"

const db = require('./db.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Account {

    constructor() {
        //This is intentional
    }

    async addUser(body){
        // Check if username already exists
        const existingUser = await db.up_users.findOne({ where: { username: body.username } });
        if (existingUser) {
            return {
                "code": -1,
                "type": "user",
                "message": "Username already exists"
            }
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);

        let addUserResponse = await db.up_users.create(body);
        if(addUserResponse != null){
            return {
                "code": 0,
                "type": "user",
                "message": "success"
            }
        } else {
            return {
                "code": -1,
                "type": "user",
                "message": "fail"
            }
        }
    }

    async editUser(id, body){
        // Hash the new password before storing it
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }

        let updateResponse = await db.up_users.update(body, {
            where: {
                id: id
            }
        });
        if(updateResponse != null){
            return {
                "code": 0,
                "type": "user",
                "message": "success"
            }
        } else {
            return {
                "code": -1,
                "type": "user",
                "message": "fail"
            }
        }
    }

    async loginUser(username, password){
        // Find the user by username
        const user = await db.up_users.findOne({ where: { username: username } });
        
        // If user not found, return an error
        if (!user) {
            return {
                "code": -1,
                "type": "user",
                "message": "Username not found"
            }
        }

        // Check the password
        const validPassword = await bcrypt.compare(password, user.password);
        
        // If password is not valid, return an error
        if (!validPassword) {
            return {
                "code": -1,
                "type": "user",
                "message": "Invalid password"
            }
        }

        // If username and password are correct, generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Return success with the token
        return {
            "code": 0,
            "type": "user",
            "message": "Login successful",
            "token": token
        }
    }

    async getUser(id){
        const user = await db.up_users.findOne({ where: { id: id } });
        
        if (!user) {
            return {
                "code": -1,
                "type": "user",
                "message": "User not found"
            }
        }
    
        return {
            "code": 0,
            "type": "user",
            "message": "success",
            "user": user
        }
    }
    

}

module.exports = Account;
