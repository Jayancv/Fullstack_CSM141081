import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
        return action.payload.notification
    },
    clearNotification() {
      return ''
    },
  },
})

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(createNotification({ notification: message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export const { createNotification, clearNotification } =  notificationSlice.actions
export default notificationSlice.reducer
