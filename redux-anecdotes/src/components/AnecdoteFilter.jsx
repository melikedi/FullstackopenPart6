import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const AnecdoteFilter = () => {

    const dispatch = useDispatch()
    const handleChange = (event) => {
        // console.log(event.target.value)
        dispatch(filterChange(event.target.value))
      // input-field value is in variable event.target.value
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default AnecdoteFilter