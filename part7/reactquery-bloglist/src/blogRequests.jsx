import axios from "axios";

const baseUrl = 'http://localhost:3003/api/blogs'

let token
const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

export const getBlogs = () => 
    axios.get(baseUrl).then(res => res.data)

export const createBlog = (blogObject) => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.post(baseUrl, blogObject, config).then(res=>res.data)
}

export const removeBlog = (id) => {
    const config = {
      headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${id}`, config).then(res=>res.data)
}

export const updateBlog = (blogObject) => {
    const config = {
      headers: { Authorization: token }
    }
    console.log(blogObject)
    return axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config).then(res=>res.data)
}
  

export default {setToken}