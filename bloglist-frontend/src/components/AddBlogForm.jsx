import { useState } from 'react'
import AddFormInput from './AddFormInput'
import blogService from '../services/blogs'

import { Form, Button } from 'react-bootstrap'

const AddBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const {
    username,
    password,
    setRequireUpdateBlogs,
    activateNotification,
    togglableRef,
    sendNewBlog,
  } = props

  const sendBlogHandle = async (event) => {
    event.preventDefault()
    console.log('send new blog  with', username, password)

    await sendNewBlog(
      togglableRef,
      title,
      author,
      url,
      likes,
      setRequireUpdateBlogs,
      activateNotification,
    )
  }

  return (
    <div>
      <h2>Add blog</h2>

      <div>
        <Form>
          <AddFormInput value={title} name="title" setter={setTitle} />
          <AddFormInput value={author} name="author" setter={setAuthor} />
          <AddFormInput value={url} name="url" setter={setUrl} />
          <AddFormInput value={likes} name="likes" setter={setLikes} />

          <Button onClick={sendBlogHandle}> Send blog </Button>
        </Form>
      </div>
    </div>
  )
}

export default AddBlogForm
