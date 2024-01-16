import ReactDOM from 'react-dom/client'
//import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes:anecdoteReducer,
    filter:filterReducer,
    notification:notificationReducer
  }
})

/* const reducer = combineReducers({
  anecdotes:anecdoteReducer,
  filter:filterReducer,
  notification:notificationReducer
})
const store = createStore(reducer)
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)