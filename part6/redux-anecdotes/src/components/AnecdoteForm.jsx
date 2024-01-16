import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdoteinput.value
        dispatch(createAnecdote(anecdote))
        
        /* dispatch(addNotification(`you added ${anecdote}`))
        setTimeout(() => {
            dispatch(removeNotification(''))
        }, 5000); */
        event.target.anecdoteinput.value = ''
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdoteinput'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )

}

export default AnecdoteForm