import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
   return axios.get(baseUrl).then(res => {
      return res.data
    })
}

export const createNew = (anecdote) => {
    return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const updateAnecdote = (anecdote) => {
    return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}