import { createSlice, current } from "@reduxjs/toolkit"
import AnecdoteService from "../services/AnecdoteService"

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState : [],
  reducers: {
    appendAnecdote(state,action) {
      state.push(action.payload)
    },
    setAnecdotes(state,action) {
      return action.payload
    },
    replaceAnecdote(state,action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote=>anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    }
  }
})


export default anecdoteSlice.reducer
export const { replaceAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await AnecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote,votes : anecdote.votes + 1}
    await AnecdoteService.update(anecdote.id,updatedAnecdote)
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}


