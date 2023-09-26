const User = require('../models/user')
const Blog = require('../models/blog')

let tokens = []
let authenticatedUsers = []

const exampleUsers = [
    {
        name: "Judy Smith",
        username: "jaysmee",
        password: "wrteuip"
    },
    {
        name: "Kuug Smittny",
        username: "smitkuu",
        password: "7yuyeui"
    }
]

const initialBlogs = [
    {
        title: 'He acted as Mr Bean',
        author: 'Rowan Atkinson',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 17,
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
]

const addUsers = async (api) => {

    const exampleUsersKeys = exampleUsers.keys()
    for(let key of exampleUsersKeys){
        await api
            .post('/api/users')
            .send(exampleUsers[key])
    }

}

const loginUsers = async (api) => {
    const exampleUsersKeys = exampleUsers.keys()

    for(let key of exampleUsersKeys){

        const loggedUser = await api
            .post('/api/login')
            .send(exampleUsers[key])

        let user = (await User.findOne({username: loggedUser._body.username})).toJSON()
        authenticatedUsers[key] = {...user, token: loggedUser._body.token}
    }
}

const addBlogs = async (bloggingUser) => {

    const initialBlogsKeys = initialBlogs.keys()
    for(let key of initialBlogsKeys){
      let blogEntry = new Blog({
        ...initialBlogs[key], user: bloggingUser.id
      })
      await blogEntry.save()
    }
}

const blogsInDb = async () => {
    let blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    exampleUsers,
    initialBlogs,
    authenticatedUsers,
    addUsers,
    loginUsers,
    addBlogs,
    blogsInDb
}