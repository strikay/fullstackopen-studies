import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, MY_INFO, ALL_BOOKS } from './queries'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState("all genres")
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded
      alert(`${book.author.name} added book ${book.title}`)

      client.cache.updateQuery({
        query: ALL_BOOKS,
        variables: {genre: genre === "all genres" ? null: genre}
      }, ({allBooks}) => {
        console.log(allBooks)
        return {
          allBooks: allBooks.concat(book),
        }
      })

      console.log(client.cache.readQuery({query: ALL_BOOKS}))
    }
  })

  useEffect(()=>{
    const retrievedToken = localStorage.getItem('library-loggedIn-token')
    if(retrievedToken){
      setToken(retrievedToken)
    }
    console.log(token)
  },[])

  const result = useQuery(MY_INFO)

  if (result.loading) return <div>loading</div>
  
  const myInfo = result.data.me

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const onLogin = () => {
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && 
            <>
              <button onClick={() => setPage('recommended_books')}>recommended</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => logout()}>logout</button>
            </>
        }
        { !token && <button onClick={() => setPage('login')}>login</button> }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} 
        genreInfo={[genre, setGenre]} 
      />

      {myInfo && <Recommended show={page === 'recommended_books'} 
        favoriteGenre={myInfo.favoriteGenre}
      />}

      <NewBook 
        show={page === 'add'} 
        genreInfo={[genre, setGenre]} />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken} 
        onLogin={onLogin} 
      />

    </div>
  )
}

export default App
