import { useReducer } from "react";
import { createContext } from "react";
import {PropTypes} from 'prop-types'

const notificationReducer = (state, action) => {

    switch(action.type){
        case 'SET':
            return action.payload
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

export const setNotification = (notification) => {
    return {
        type:'SET',
        payload:notification
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}




const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
    const [notification, notificationDispatcher] = useReducer(notificationReducer, '')

    return (
    <NotificationContext.Provider value={[notification, notificationDispatcher]}>
        {children}
    </NotificationContext.Provider>
   )
}

NotificationContextProvider.propTypes = {
    children: PropTypes.children.isRequired
  }

export default NotificationContext