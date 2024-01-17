import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const login = async  (e) => {
      e.preventDefault()
      if (await handleLogin(username, password) === 'success'){
        setUsername('')
        setPassword('')
      }
    }

    const Header = ({label}) => (
        <>
          <h2>{label}</h2>
          <Notification/>
        </>
    )

    return (
      <> 
        <Header label='log in to application' />
        <form onSubmit={login}>
          <div>
            username: <input id='username' type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
          </div>
          <div>
            password: <input id='password' type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </div>
          <button id='login-button' type="submit">log in</button>
        </form>
      </>
    )
  }

  export default LoginForm