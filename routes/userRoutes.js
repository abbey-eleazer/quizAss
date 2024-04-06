const express = require('express')
const { signup, login, getUsers } = require('../controllers/userController')
const verifyToken = require('../middleware/verifyToken')


const userRouter = express.Router()


userRouter.post('/signup', signup)
userRouter.get('/login', login)
userRouter.get('/users', verifyToken, getUsers)


module.exports = userRouter