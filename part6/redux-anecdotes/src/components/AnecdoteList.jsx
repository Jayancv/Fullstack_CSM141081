import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({}) => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filter = useSelector((state) => state.filter)

  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote',anecdote.id)
    dispatch(voteAnecdoteAction(anecdote))
    dispatch(setNotification( `you voted '${anecdote.content}'`, 5 ))
  }

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
