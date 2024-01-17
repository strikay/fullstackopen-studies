import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider} from './reducers/NotificationContext'
import { UserContextProvider } from './reducers/UserContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()
ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <QueryClientProvider client={client}>
            <NotificationContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    )
