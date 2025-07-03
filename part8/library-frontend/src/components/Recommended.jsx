import { useQuery } from '@apollo/client'
import { LOGGED_USER, FILTER_BOOKS } from '../queries'

const Recommended = ({loggedUser}) => {

  const genre =  loggedUser?.favoriteGenre

  const booksResult = useQuery(FILTER_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if ( booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data?.allBooks || []


  return (
    <div>
      <h2>Recommendations</h2>
      {genre? (
        <div>
          Books in your favorite genre {genre}
         </div> ) : ('')
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommended
