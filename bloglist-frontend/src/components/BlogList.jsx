import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import blogService from '../services/blogs'
import activateNotification from '../utils.js/activateNotification'
import setRequireUpdateBlogs from '../utils.js/setRequireUpdateBlogs'

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

const BlogList = (props) => {
  let { blogs, user, users } = useSelector((data) => {
    return {
      blogs: data.blogs.list,
      requireUpdateBlogs: data.blogs.requireUpdateBlogs,
      user: data.userData.user,
      users: data.userData.users,
    }
  })

  let { mode } = props

  const dispatch = useDispatch()

  async function likeHandle(blog) {
    const blogUpdated = { ...blog }
    blogUpdated['likes'] = blogUpdated['likes'] + 1

    try {
      await blogService.update(blogUpdated.id, blogUpdated)
      setRequireUpdateBlogs(true, dispatch)
      activateNotification('like added', 'success', dispatch)
    } catch (error) {
      activateNotification('Something went wrong:  ' + error, 'error', dispatch)
    }
  }

  if (user == null) {
    return null
  }
  let title = 'Blogs'

  if (mode == 'blogsByUser') {
    const userId = useParams().id
    blogs = blogs.filter((blog) => {
      return blog.user.id === userId
    })

    let user = users.find((user) => {
      return user.id == userId
    })
    let username = user.username
    title = 'Blogs from: ' + username
  }

  if (mode == 'specificBlog') {
    const blogId = useParams().id
    blogs = blogs.filter((blog) => {
      return blog.id === blogId
    })

    return (
      <div>
        <h2>{title}</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            setRequireUpdateBlogs={setRequireUpdateBlogs}
            likeHandle={() => {
              likeHandle(blog)
            }}
          />
        ))}
      </div>
    )
  }

  blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div>
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div key={'div' + blog.id}>
          <Link key={blog.id} to={'/blogs/' + blog.id}>
            {blog.title + ' | ' + blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
