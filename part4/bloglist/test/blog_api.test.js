const { test, describe, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const testHelper = require("./test_helper")
const { log } = require("node:console")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.initialBlogs)
})

describe("Blog API get blogs test", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
  })

  test("a specific blog is returned", async () => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map((blog) => blog.title)
    assert.deepStrictEqual(titles.includes("React patterns"), true)
  })

  test("blogs have an id property", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach((blog) => {
      assert.ok(blog.id)
    })
  })

  test("blogs have unique ids", async () => {
    const response = await api.get("/api/blogs")
    const ids = response.body.map((blog) => blog.id)
    const uniqueIds = new Set(ids)
    assert.strictEqual(uniqueIds.size, ids.length)
  })
})

describe("Blog API post blogs test", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "New Blog",
      author: "James Smith",
      url: "https://wikipedia.org/wiki/New_Blog",
      likes: 1,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map((blog) => blog.title)
    assert.ok(titles.includes("New Blog"))
  })

  test("if likes is missing, it defaults to 0", async () => {
    const newBlog = {
      title: "New Blog Without Likes",
      author: "James Smith",
      url: "https://wikipedia.org/wiki/New_Blog",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1)
    const newBlogDB = blogsAtEnd.find(
      (blog) => blog.title == "New Blog Without Likes"
    )
    assert.ok(newBlogDB)
    assert.strictEqual(newBlogDB.likes, 0)
  })

  test("blog without title is not added", async () => {
    const titleMissing = {
      author: "James Smith",
      url: "https://wikipedia.org/wiki/New_Blog",
      likes: 1,
    }

    await api.post("/api/blogs").send(titleMissing).expect(400)
    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length)
  })
  
  test("blog without url is not added", async () => {
    const urlMissing = {
      title: "New Blog Without URL",
      author: "James Smith",
      likes: 1,
    }

    await api.post("/api/blogs").send(urlMissing).expect(400)
    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log("Connection to MongoDB closed")
})
