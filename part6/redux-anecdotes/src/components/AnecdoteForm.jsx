import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/Anecdotes'

const AnecdoteForm = ({}) => {
  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target[0].value
    event.target[0].value = ''

    console.log('create', content)

    const newAnecdote = await anecdoteService.create(content) 
    console.log(newAnecdote)
    dispatch({type: 'anecdotes/createAnecdote', payload: { newAnecdote }})
    dispatch(setNotification({ notification: `you created '${newAnecdote.content}'` }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
