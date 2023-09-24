const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')


loginRouter.post('/', async (request, response) => {
    const {password, username} = request.body

    const user = await User.findOne({username})
    let passwordCorrect = null
    if(user){
        passwordCorrect = await bcrypt.compare(password, user.password)
    }
    if(!(passwordCorrect&&user)){
        return response.status(400).json({error: 'invalid username or password'})
    }
    const userForToken = {
        username: user.username,
        id:user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter