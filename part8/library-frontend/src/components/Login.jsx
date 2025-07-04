import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { USER_LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({setToken , setError}) => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ userLogin, result ] = useMutation(USER_LOGIN, {
    //   refetchQueries: [ { query: ALL_AUTORS }, { query: ALL_BOOKS } ],
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        setError(messages, true)
      }
    })

    useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      navigate('/')
      setError('Login sucess...', false)
    }
    }, [result.data])
  
    const handleLogin = async (event) => {
      event.preventDefault()
  
      console.log('User Login ...')
      userLogin({variables:{ username, password}})
      setUsername('')
      setPassword('')
      
    }

  return (
    <div>
      <br />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' name='Username' value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type='password' name='Password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='Submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
