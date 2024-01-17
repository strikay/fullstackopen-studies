import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  ///const response = await request
  return response.data
}

const update = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, update, remove, setToken }