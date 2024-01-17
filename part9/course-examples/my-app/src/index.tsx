import ReactDOM from 'react-dom/client'
import App from './App'

interface WelcomeProps {
  name: string;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)