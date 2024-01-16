import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext, { setNotification } from './providers/NotificationContext'

const App = () => {

  const [notification, dispatch] = useContext(NotificationContext)
      

  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', getAll, {
    refetchOnWindowFocus: false
  })

  const updateMutatation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData()
      dispatch(setNotification(`anecdote ${updatedAnecdote.content} voted`))
      
      queryClient.setQueryData(
        'anecdotes', 
        anecdotes.map(anecdote => (
          anecdote.id === updatedAnecdote.id
          ? updatedAnecdote 
          : anecdote 
        ))
      )
    },
  })

  const handleVote = (anecdote) => {
    updateMutatation.mutate({...anecdote, votes:anecdote.votes+1})
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdotes service is not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
