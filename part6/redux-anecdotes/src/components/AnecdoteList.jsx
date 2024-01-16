import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import Filter from "./Filter"
import Notification from "./Notification"

const AnecdoteList = () => {

    const anecdotes = useSelector(({anecdotes, filter}) => {
        const returnedAnecdotes = [...anecdotes]
        console.log(anecdotes)
        
        return (
            returnedAnecdotes
                .sort((a,b)=>b.votes-a.votes)
                .filter((a) => a.content.includes(filter))
            )
    })
    const notification = useSelector(({notification}) => notification)
    const dispatch = useDispatch()
  
    const vote = (id) => {
     dispatch(voteFor(id))
     /*      dispatch(addNotification(`you voted for ${(anecdotes.find(a => a.id ===id)).content}`))
     setTimeout(() => {
         dispatch(removeNotification(''))
     }, 5000); */
    }
  
  
    return (
      <>
        <h2>Anecdotes</h2>
        {notification && <Notification/>}
        {!notification &&<Filter/>}
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </>
    )
}

export default AnecdoteList