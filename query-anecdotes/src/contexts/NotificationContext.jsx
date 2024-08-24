import { createContext, useReducer, useContext } from "react"
import { PropTypes } from 'prop-types'
const notificationReducer = (state,action)=>{
    switch(action.type) {
        case "setNotificationMessage":
            return action.payload
        case "resetNotificationMessage":
            return null
        default:
            return state
    }   
}
const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    const dispatch = notificationAndDispatch[1]
    return (payload) => {
        dispatch({ type: "setNotificationMessage", payload})
        setTimeout(() => {
            dispatch({ type: "resetNotificationMessage"})
         }, 5000)
    }
}


  

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
NotificationContextProvider.propTypes = {
    children: PropTypes.element
}