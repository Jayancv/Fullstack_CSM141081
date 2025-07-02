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

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String, $genres: [String!]) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    author
    genres
    published
    id
  }
}
`

export const FILTER_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    author
    genres
    published
    id
  }
}
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