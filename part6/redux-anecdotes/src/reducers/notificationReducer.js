import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload.notification;
        },
        clearNotification() {
            return '';
        }
    }
});
export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
