import { useEffect } from "react"
import { initializeNotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import AnectdoteList from "./components/AnectdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteFilter from "./components/AnecdoteFilter"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initializeNotes())
  })

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnectdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App