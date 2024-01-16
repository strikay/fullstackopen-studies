import {createSlice} from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import { setNotification } from "./notificationReducer"

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

//const getId = () => (100000 * Math.random()).toFixed(0)

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */

//const initialState = anecdotesAtStart.map(asObject)

/* const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':{
      const selectedAnecdoteID = action.payload.id
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === selectedAnecdoteID)
      const updatedAnecdote = {...anecdoteToUpdate, votes:anecdoteToUpdate.votes+1}
      const anecdotes = state.map(anecdote => (
        anecdote.id !== updatedAnecdote.id
        ? anecdote
        : updatedAnecdote
      ))
      return anecdotes
    }
    case 'ADD':
      return state.concat(action.payload)
    default:
      return state
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id:id
    }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    payload: {
      content: anecdote,
      id:getId(),
      votes:0
    }
  }
} */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    createAnecdote(state,action){
      const content = action.payload
      state.push(content)
    },
    updateAnecdote(state,action){
      const updatedAnecdote = action.payload
      const anecdotes = state.map(anecdote => (
        anecdote.id !== updatedAnecdote.id
        ? anecdote
        : updatedAnecdote
      ))
      return anecdotes
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    console.log(anecdote)
    dispatch(appendAnecdote(anecdote))
    dispatch(setNotification(`you added ${anecdote.content}`, 10))

  }
}

export const voteFor = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToUpdate = state.anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {...anecdoteToUpdate, votes:anecdoteToUpdate.votes+1}

    const anecdote = await anecdoteService.updateOne(updatedAnecdote)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted for ${anecdote.content}`, 10))
  }
}

export default anecdoteSlice.reducer