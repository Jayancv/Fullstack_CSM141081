import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  // if (!props.show) {
  //   return null
  // }
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS)
  let books = []
  let genres = []
  let filteredBooks = []
  if(result.loading){
    return <div>loading...</div>
  }

  if(result.data.allBooks){
    books = result.data.allBooks
    filteredBooks = books
    genres = Array.from(new Set(books.flatMap((b) => b.genres)))
  }

  if(genre){
    filteredBooks = books.filter(b => b.genres.includes(genre))
  } 



  return (
    <div>
      <h2>books</h2>
      {genre? (
        <div>
          in genre {genre}
         </div> ) : ('')
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button   onClick={ ()=> setGenre('')}>None</button>
      {genres.map((g, idx) => (
        <button key={idx} onClick={ ()=> setGenre(g)}>{g}</button>
      ))}

    </div>
  )
}

export default Books
