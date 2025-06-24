import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload.filter
    },
    clearFilter() {
      return ''
    }
  }
})

export const { setFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer