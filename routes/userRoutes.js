const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController.js')



router
    .post('/register', userController.createUser)
    .get('/all-users', userController.getAllUsers)
    .get('/get-user/:userId', userController.getUserById)



 module.exports = router;
