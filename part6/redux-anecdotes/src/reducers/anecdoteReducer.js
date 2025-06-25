import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload.id
      const anecdoteToVote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    },
    createAnecdote: (state, action) => {
      const newAnecdote = action.payload
      console.log('createAnecdote', newAnecdote)
      state.push(newAnecdote)
    },
    setAnecdotes: (state, action) => {
      return action.payload.anecdotes
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes({ anecdotes }))
  }
}

export const createNewAction = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdoteAction = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log(updatedAnecdote)
    const anecdoteToVote = await anecdoteService.update(updatedAnecdote)
    dispatch(voteAnecdote({ id: anecdoteToVote.id }))
  }
}

export const { voteAnecdote, createAnecdote, setAnecdotes } =  anecdoteSlice.actions
export default anecdoteSlice.reducer
