import { gql } from '@apollo/client'

export const ALL_AUTORS = gql`
  query {
    allAuthors {
      name,
      born,
      id,
      bookCount
    }
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
}
`
export const ALL_BOOKS = gql`
  query {
    allBooks  {
      ...BookDetails
  }
}
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String, $genres: [String!]) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    ...BookDetails
  }
}
  ${BOOK_DETAILS}
`

export const FILTER_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
      ...BookDetails
  }
}
  ${BOOK_DETAILS}

`

export const EDIT_NUMBER = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    id
    bookCount
  }
}
`

export const USER_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
}`

export const LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      username
      favoriteGenre
    }
}`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
