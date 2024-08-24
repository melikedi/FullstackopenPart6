import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote, deleteAnecdote } from './services/AnecdoteService'
import { useNotificationDispatch } from './contexts/NotificationContext'


const App = () => {
  const notify = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation( { 
    mutationFn : createAnecdote, 
    onSuccess:({ content })=> { 
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      notify(`anecdote '${content}' created`)
    },
    onError: (error) =>{ 
      notify( error.response.data.error)
    }
  })
  const updateAnecdoteMutation = useMutation( { 
    mutationFn : updateAnecdote, 
    onSuccess:({content})=> { 
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      notify(`you voted '${content}'`)
    } 
  })
  const deleteAnecdoteMutation = useMutation( { 
    mutationFn : deleteAnecdote, 
    onSuccess:()=> { 
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      notify(`anecdote deleted`)
    } 
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
  }
  const handleDelete = async(anecdote) => {
    deleteAnecdoteMutation.mutate(anecdote.id)
  }
  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
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
            <button onClick={() => handleDelete(anecdote)}>delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
