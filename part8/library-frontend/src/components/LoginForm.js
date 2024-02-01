import { useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({show, setToken, onLogin}) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginUser, result ] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-loggedIn-token', token)
            onLogin()
        }
    }, [result.data])

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser({variables: {username, password}})
    }

    if(!show) return null

    return (
        <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input 
                        value={username} 
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input 
                        type='password'
                        value={password} 
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm