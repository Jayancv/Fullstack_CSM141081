import React from "react"
import blogService from "../services/blogs"

const NewBlogForm = ({ blogs, setBlogs, notification, setNotification }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    try {
      const newBlog = await blogService.create({ title, author, url })
      console.log("New blog created:", newBlog)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        error: 0,
        message: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
      })
      setTimeout(() => {
        setNotification({ error: 0, message: null })
      }, 5000)
      event.target.reset() // Reset the form fields
    } catch (error) {
      console.error("Error creating blog:", error)
      setNotification({
        error: 1,
        message: "Failed to create blog. Please try again.",
      })
      setTimeout(() => {
        setNotification({ error: 0, message: null })
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input type="text" name="title" />
        </div>
        <div>
          Author: <input type="text" name="author" />
        </div>
        <div>
          URL: <input type="text" name="url" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
