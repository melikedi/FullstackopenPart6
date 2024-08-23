import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from "@reduxjs/toolkit"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const Anecdotes = () => {
 
    const selectAnecdotes = (state) => state.anecdotes;
    const selectFilter = (state) => state.filter;
    const selectAnecdotesFilteredAndSorted = createSelector(selectAnecdotes,selectFilter,(initialAnecdotes, filter) => {
      return [...initialAnecdotes].filter(a => { return a.content.includes(filter) }).sort((b1,b2) => { return b2.votes - b1.votes})
    });
    const anecdotes = useSelector(selectAnecdotesFilteredAndSorted);
    const dispatch = useDispatch()
    const voteForAnecdote = async(anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`,5))
    }
    return(
        <div>
            { anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}
export default Anecdotes