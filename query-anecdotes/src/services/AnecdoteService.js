import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
export const createAnecdote = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    console.log(response.data)
    return response.data
}
export const updateAnecdote = async (updatedAnecdote) => {
   return await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(response=>response.data).catch(e=>console.log(e))
}
export const deleteAnecdote = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`).catch(e=>console.log(e))
}

// export default { getAll,  createNew, update}