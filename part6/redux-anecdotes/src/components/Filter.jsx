
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterValue = event.target.value
    console.log('filter', filterValue)
    dispatch({type: 'filter/setFilter', payload: { filter: filterValue }})
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} name='filterValue' />
    </div>
  )
}

export default Filter