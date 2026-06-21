import { useState, useEffect, useRef } from 'react'

import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

import blogService from './services/blogs'
import usersService from './services/users'

import './index.css'
import { useDispatch, useSelector } from 'react-redux'

import { setUser, setUsers } from './reducers/user'
import activateNotification from './utils.js/activateNotification'
import setRequireUpdateBlogs from './utils.js/setRequireUpdateBlogs'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'

import { Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const { blogs, requireUpdateBlogs, user, username, password, users } =
    useSelector((data) => {
      return {
        blogs: data.blogs.list,
        requireUpdateBlogs: data.blogs.requireUpdateBlogs,
        user: data.userData.user,
        username: data.userData.username,
        password: data.userData.password,
        users: data.userData.users,
      }
    })

  const dispatch = useDispatch()

  const togglableRef = useRef()

  async function sendNewBlog(
    togglableRef,
    title,
    author,
    url,
    likes,
    setRequireUpdateBlogs,
    activateNotification,
  ) {
    try {
      togglableRef.current.toggleVisibility()
      await blogService.create({
        title,
        author,
        url,
        likes,
      })
      setRequireUpdateBlogs(true, dispatch)
      activateNotification('Blog added', 'success', dispatch)
    } catch (exception) {
      activateNotification('Wrong credentials, ' + exception, 'error', dispatch)
    }
  }

  const credentialsAndUpdateState = {
    username,
    password,
    setRequireUpdateBlogs,
    activateNotification,
    togglableRef,
    user,
    sendNewBlog,
  }

  const logOutHandle = () => {
    activateNotification('log out successfully', 'success', dispatch)
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(setUser(null))
  }

  // update blogs and user
  useEffect(() => {
    if (requireUpdateBlogs) {
      setRequireUpdateBlogs(false, dispatch)
      blogService.getAll().then((blogs) =>
        dispatch({
          type: 'setBlogs',
          payload: {
            blogs: blogs,
          },
        }),
      )
      usersService.getAll().then((users) => dispatch(setUsers(users)))
    }
  }, [requireUpdateBlogs])

  // try to log in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const padding = {
    padding: 5,
  }

  return (
    <div className="container">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  blogs
                </Link>
              </Nav.Link>

              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  users
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Notification />
      {user !== null && (
        <button onClick={logOutHandle}>log Out {user.username} </button>
      )}
      {user !== null && (
        <Togglable buttonLabel="Create blog" ref={togglableRef}>
          <AddBlogForm {...credentialsAndUpdateState}></AddBlogForm>
        </Togglable>
      )}
      <LoginForm />

      <Routes>
        <Route path="/users" element={<UserList users={users} user={user} />} />
        <Route path="/users/:id" element={<BlogList mode="blogsByUser" />} />
        <Route path="/blogs/:id" element={<BlogList mode="specificBlog" />} />
        <Route path="/" element={<BlogList mode="allBlogs" />} />
      </Routes>
    </div>
  )
}

export default App
