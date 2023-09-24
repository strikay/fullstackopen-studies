const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if(!(password && username)){
        return response.status(400).json({error: 'please enter pasword or username'})
    } else if(password.length < 3 || username.length < 3){
        return response.status(400).json({error: 'password and username must have more than 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: username,
        name: name,
        blogs: [],
        password: passwordHash,
    })

    const savedUser = await user.save()

    console.log(savedUser)

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter