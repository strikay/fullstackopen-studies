import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch(action.type){
      case 'SET_NOTIFICATION':
        console.log(action.payload)
        return action.payload
      case 'REMOVE_NOTIFICATION':
        return {message:null, color:'red'}
      default:
        return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
    const [notification, dispatchNotification] = useReducer(notificationReducer, {message:null, color:'red'})
    return(
        <NotificationContext.Provider value={[notification, dispatchNotification]}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext

