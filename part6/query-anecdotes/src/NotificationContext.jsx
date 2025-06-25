import { createContext, useReducer, useContext  } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type){
        case "CREATE":
            console.log(action)
            return action.payload
        case "CLEAR":
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props)=>{
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification,notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationrDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext