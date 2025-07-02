import { useQuery, useMutation } from '@apollo/client'
import { EDIT_NUMBER,ALL_AUTORS } from '../queries'
import { useState } from 'react'

const Authors = (props) => {
  // if (!props.show) {
  //   return null
  // }

  const FormAutorBirthDay = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    
    const [ updateAuthor ] = useMutation(EDIT_NUMBER, {
        refetchQueries: [ { query: ALL_AUTORS } ],
        // onError: (error) => {
        //   const messages = error.graphQLErrors.map(e => e.message).join('\n')
        //   setError(messages)
        // }
      })

    const submit = async (event) => {
    event.preventDefault()

    console.log('update author...')
    updateAuthor({variables:{ name, setBornTo:Number(born)}})
    setName('')
    setBorn('')

  }

    return (
    <div>
      <form onSubmit={submit}>
        {/* <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <select
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        >
          {props.authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
    )
  }

  let authors = []

  const result = useQuery(ALL_AUTORS)

  if(result.loading){
    return <div>loading...</div>
  }

  if(result.data.allAuthors){
    authors = result.data.allAuthors
  }

  return (
    <div>
      <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
        <h2>Set Birthday</h2>
        <FormAutorBirthDay authors={authors}/>
      </div>
    </div>
  )
}

export default Authors
