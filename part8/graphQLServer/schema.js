
const typeDefs = `
  type Book {
    title: String!
    author: Author!
    genres: [String!]
    published : Int!
    id: ID! 
  }

  type Author {
    name: String!
    born : Int
    id: ID! 
    bookCount:Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }


  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book!],
    allAuthors: [Author!]
    loggedUser: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      genres: [String!]
      published : Int!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  } 
`

module.exports = typeDefs