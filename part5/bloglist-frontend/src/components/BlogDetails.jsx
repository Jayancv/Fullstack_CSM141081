import React from "react"
import { useState } from "react"
import Blog from "./Blog"
import Logout from "./Logout"
import NewBlogForm from "./NewBlogForm"
import Notification from "../components/Notification"

const BlogDetails = ({
  blogs,
  setBlogs,
  user,
  setUser,
  notification,
  setNotification,
}) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification error={notification.error} message={notification.message} />
      <p>
        {user.name} logged in
        <Logout setUser={setUser} />
      </p>
      <br />
      <NewBlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        notification={notification}
        setNotification={setNotification}
      />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
export default BlogDetails
