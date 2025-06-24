import { useDispatch } from 'react-redux'
import { createNewAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({}) => {
  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target[0].value
    event.target[0].value = ''

    console.log('create', content)
    dispatch(createNewAction(content))
    dispatch(setNotification( `you created '${content}'`,  5 ))
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
