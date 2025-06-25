import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useNotificationrDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const dispatch = useNotificationrDispatch()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote)
      const exsitingList = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], exsitingList.concat(newAnecdote))
      dispatch({
        type: "CREATE",
        payload: `${newAnecdote.content} Added`
      })
    },
    onError: (anecdoteError) => {
      dispatch({
        type: "CREATE",
        payload: anecdoteError.response.data.error
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({content, votes:0})
    setTimeout( ()=> dispatch({
        type : "CLEAR"
      }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
