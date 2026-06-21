import { useDispatch, useSelector } from 'react-redux'

import { setUsername, setUser, setPassword } from '../reducers/user'
import loginService from '../services/login'
import blogService from '../services/blogs'
import activateNotification from '../utils.js/activateNotification'

import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const { user, username, password } = useSelector((data) => {
    return {
      user: data.userData.user,
      username: data.userData.username,
      password: data.userData.password,
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      activateNotification('log in successfully', 'success', dispatch)
    } catch (exception) {
      activateNotification('Wrong credentials, ' + exception, 'error', dispatch)
    }
  }

  if (user) {
    return null
  }

  return (
    <Form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <Button type="submit">login</Button>
    </Form>
  )
}
export default LoginForm
