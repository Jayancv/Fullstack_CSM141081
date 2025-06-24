import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({}) => {
  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target[0].value
    event.target[0].value = ''

    console.log('create', content)
    dispatch(createAnecdote(content))
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
