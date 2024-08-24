import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './services/AnecdoteService'
import { useNotificationDispatch } from './contexts/NotificationContext'


const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation( { 
    mutationFn : createAnecdote, 
    onSuccess:()=> { queryClient.invalidateQueries({ queryKey: ['anecdotes']})},
    onError: (error) =>{ 
      console.log(error)
      dispatch({ type: "setNotificationMessage", payload: error.response.data.error})
      setTimeout(() => {
         dispatch({ type: "resetNotificationMessage"})
      }, 5000)
    }
  })
  const updateAnecdoteMutation = useMutation( { 
    mutationFn : updateAnecdote, 
    onSuccess:()=> { queryClient.invalidateQueries({ queryKey: ['anecdotes']})} 
  })
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    console.log(result.error)
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = async(anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "setNotificationMessage", payload: `you voted '${anecdote.content}'`})
    setTimeout(() => {
       dispatch({ type: "resetNotificationMessage"})
    }, 5000)
  
  }
  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    await newAnecdoteMutation.mutate(content)
    dispatch({ type: "setNotificationMessage", payload: `you created '${content}'`})
    setTimeout(() => {
       dispatch({ type: "resetNotificationMessage"})
    }, 5000)
    
  }
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm handleAddAnecdote = {handleAddAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
