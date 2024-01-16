import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const createNew = async (anecdote) => {
    const result = await axios.post(baseUrl, asObject(anecdote))
    return result.data
}

const updateOne = async (anecdote) => {
    const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return result.data
}

export default { createNew , getAll, updateOne }