import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({}) => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filter = useSelector((state) => state.filter)

  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({ type: 'anecdotes/voteAnecdote', payload: { id } })
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch( { type: 'notification/setNotification', payload: { notification: `you voted '${votedAnecdote.content}'` } }  )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
