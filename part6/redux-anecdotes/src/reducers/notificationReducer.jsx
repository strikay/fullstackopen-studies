import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        addNotification(state, action){
           return action.payload
        },
        removeNotification(state,action){
            const payload = action.payload
            return payload
        }
    }
})

export const {addNotification,removeNotification} = notificationSlice.actions

export const setNotification = (notification, timeout) => {
    return dispatch => {
        dispatch(addNotification(notification))
        setTimeout(() => {
        dispatch(removeNotification(''))
        }, timeout*1000)
    }
}
export default notificationSlice.reducer