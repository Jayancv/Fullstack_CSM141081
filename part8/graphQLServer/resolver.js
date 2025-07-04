
const { GraphQLError } = require("graphql")
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require("./src/schemas/Book")
const Author = require("./src/schemas/Author")
const User = require("./src/schemas/User")

const jwt = require("jsonwebtoken")
require("dotenv").config()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      let filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      return Book.find(filter).populate("author")
    },
    loggedUser: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root, args, context) => {
      // // console.log(root.name)
      // const books = await Book.find({ author: root._id })
      // // console.log(books)
      // return books.length
      
      if (!context.bookCountsPromise) {
        context.bookCountsPromise = Book.aggregate([
          { $group: { _id: "$author", count: { $sum: 1 } } }
        ]).then(counts => {
          const map = {}
          counts.forEach(c => {
            map[c._id.toString()] = c.count
          })
          context.bookCounts = map
          return map
        })
      }
      const bookCounts = context.bookCounts || await context.bookCountsPromise
      return bookCounts[root._id.toString()] || 0
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          })
        }
      }
      const newBook = new Book({ ...args, author: author })
      try {
        const newBk = await newBook.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: newBk })

        return newBk

      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError("Editing author failed: " + error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed" + error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers
