import { useQuery, useMutation, gql} from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { useState, useEffect } from 'react'

const UPDATE_AUTHOR = gql`
mutation updateBorn($name: String!, $born: Int!){
  editAuthor(
    name: $name
    setBornTo: $born
  ){
    name
    born
    bookCount
  }
}
`
const BornForm = ({authors}) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR,
    {refetchQueries:[{query:ALL_AUTHORS}]}
  )

  useEffect(()=>{
    console.log(result.data)
  },[result.data])

  const updateBirthYear = (event) => {
    event.preventDefault()
    updateAuthor({ variables: {name, born: Number(born)} })
    setName('')
    setBorn('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateBirthYear}>
        <div>
          <label >name:</label>
          <select name="authors" id="authors" onChange={({target}) => setName(target.value)}>
            {authors.map((author) => <option key={author.name} value={author.name}>{author.name}</option>)}
          </select>

        </div>
        <div>
          born
          <input type='number' value={born} onChange={({target}) => setBorn(target.value)}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

}
const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  console.log(result)
  if(result.loading) return <div>loading</div>
  const authors = result.data.allAuthors
  console.log(authors)

  return (
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
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BornForm authors={authors}/>
    </div>
  )
}

export default Authors
