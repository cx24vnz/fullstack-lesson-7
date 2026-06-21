import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'

import activateNotification from '../utils.js/activateNotification'

const Blog = (props) => {
  const dispatch = useDispatch()

  let [comment, setComment] = useState('')

  const { setRequireUpdateBlogs, blog, user, likeHandle } = props

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  async function deleteHandle() {
    if (!window.confirm('Remove blog ' + blog.title)) {
      return
    }

    try {
      await blogService.deleteBlog(blog.id)
      setRequireUpdateBlogs(true, dispatch)
      activateNotification('blog deleted', 'success', dispatch)
    } catch (error) {
      activateNotification('Something went wrong:  ' + error, 'error', dispatch)
    }
  }

  let deleteComponent

  if (user && blog.user.username === user.username) {
    deleteComponent = <button onClick={deleteHandle}> Remove</button>
  }

  async function addCommentHandle(event) {
    event.preventDefault()
    if (!window.confirm('add comment')) {
      return
    }

    let commentObj = { text: comment }
    try {
      await blogService.createComment(commentObj, blog.id)
      setComment('')
      setRequireUpdateBlogs(true, dispatch)
      activateNotification('comment added', 'success', dispatch)
    } catch (error) {
      activateNotification('Something went wrong:  ' + error, 'error', dispatch)
    }
  }
  function commentChangeHandle({ target }) {
    console.log(target.value)
    setComment(target.value)
  }

  return (
    <div className="blog" style={blogStyle}>
      <h2>
        {blog.title} {blog.author}{' '}
      </h2>
      {blog.url}
      <div className="divOneLine">
        <p> Likes {blog.likes}</p>
        <button className="likeButton" onClick={likeHandle}>
          {' '}
          Like
        </button>
      </div>

      {blog.user?.username}

      <br />
      {deleteComponent}

      <br />
      <h3>comments</h3>
      {blog.comments.map((comment) => {
        return <p key={comment.id}>{comment.text}</p>
      })}

      <h3>Add comment</h3>
      <input value={comment} onChange={commentChangeHandle} />
      <input type="button" value="submit comment" onClick={addCommentHandle} />
    </div>
  )
}

export default Blog
