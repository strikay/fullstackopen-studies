const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

const createPasswordHash = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

const initialUsers = async () => {
    return [
        {
            name: 'Joe Bell',
            username: 'joeb',
            password: (await createPasswordHash('wtrpyu'))
        },
        {
            name: 'Monica Cloe',
            username: 'claycloe',
            password: (await createPasswordHash('wrteuip'))
        }
    ]
}

beforeEach(async () => {
    await User.deleteMany({})

    await (new User((await initialUsers())[0])).save()
    await (new User((await initialUsers())[1])).save()
})

test('correct user information gets saved to the database', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
        name: "Judy Smith",
        username: "jaysmee",
        password: "wrteuip"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    let usersAtEnd = await User.find({})
    usersAtEnd = usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd.length).toEqual(usersAtStart.length+1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContainEqual(newUser.username)
})

test('user account creation fails with status code 400 for missing username or password', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
        name: "Judy Smith",
        username: "jaysmee"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    let usersAtEnd = await User.find({})
    usersAtEnd = usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd.length).toEqual(usersAtStart.length)

    const response = await api.post('/api/users').send(newUser)
    expect(response.body.error).toContain('please enter pasword or username')
})

test('user account creation fails with 400 for username or password shorter than 3 characters', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
        name: "Judy Smith",
        username: "jaysmee",
        password: "wr"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    let usersAtEnd = await User.find({})
    usersAtEnd = usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd.length).toEqual(usersAtStart.length)

    const response = await api.post('/api/users').send(newUser)
    expect(response.body.error).toContain('password and username must have more than 3 characters')
})