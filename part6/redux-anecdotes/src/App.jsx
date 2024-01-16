import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
//import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App