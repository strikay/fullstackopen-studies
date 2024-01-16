import { useMutation, useQueryClient } from 'react-query'
import { createNew } from '../requests'
import { useContext } from 'react'
import NotificationContext, { setNotification } from '../providers/NotificationContext'

const getId = () => {
  return String(Math.floor(Math.random()*100000))
}
const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData()

      dispatch(setNotification(`anecdote ${newAnecdote.content} added`))

      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: ({response}) => {
      dispatch({type:'SET', payload:`${response.data.error}`})

    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const id = getId();
    newNoteMutation.mutate({content, id, votes:0})
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
