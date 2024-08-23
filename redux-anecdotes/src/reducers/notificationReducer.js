import { createSlice } from "@reduxjs/toolkit"

const initialState = null
const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers: {
    setNotificationMessage(state,action){
      return action.payload
    },
    resetNotificationMessage(){
      return null
    }
  }
})
export const { setNotificationMessage, resetNotificationMessage } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(setNotificationMessage(content))
    setTimeout(() => {
      dispatch(resetNotificationMessage())
    }, duration * 1000)
  }
}
