import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {

  const [expand, setExpand] = useState(false)
  const blogBorderStyle = { border: '1px solid black', padding: '5px', marginBottom: '5px', lineHeight: '1.2' }

  const incrementLikes = () => {
    console.log(`Incremented likes for blog: ${blog.title}, new likes count: ${blog.likes + 1}`)
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

  return(
    <div style={blogBorderStyle}>
      {blog.title} - {blog.author} <button style={{ marginLeft: '5px' }} onClick={() => setExpand(!expand)}>
        {expand ? 'hide' : 'view'}
      </button>
      {expand && (
        <div>
          <p style={{ margin: '2px 0' }}>{blog.url}</p>
          <p style={{ margin: '2px 0' }}>
            likes {blog.likes} <button style={{ marginLeft: '5px' }} onClick={incrementLikes}>like</button>
          </p>
          <p style={{ margin: '2px 0' }}>{blog.user ? blog.user.name : 'Unknown user'}</p>
          <button style={{ marginLeft: '5px' }} onClick={deleteBlog} >Remove</button>
        </div>

      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog