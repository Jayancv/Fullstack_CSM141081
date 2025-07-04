import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTORS, FILTER_BOOKS } from '../queries'
import { useNavigate } from "react-router-dom";

const NewBook = ({ loggedUser, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const navigate = useNavigate();


  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTORS },
      // { query: ALL_BOOKS },
      { query: FILTER_BOOKS, variables: { genre: loggedUser?.favoriteGenre } },
    ],
    update: (cache, response) => {
			updateCache(
				cache,
				{ query: ALL_BOOKS },
				response.data.addBook
			)
    },
    onError: (error) => {
      // Extract detailed validation messages if present
      let messages = error.graphQLErrors
        .map((e) => {
          if (
            e.extensions &&
            e.extensions.error &&
            e.extensions.error.errors &&
            typeof e.extensions.error.errors === 'object'
          ) {
            // Collect all error messages from the errors object
            return Object.values(e.extensions.error.errors)
              .map((errObj) => errObj.message)
              .join('\n')
          }
          return e.message
        })
        .join('\n')
      setError(messages)
    },
    onCompleted: () => {
			navigate("/");
		}
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({
      variables: { title, author, published: Number(published), genres },
    })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
