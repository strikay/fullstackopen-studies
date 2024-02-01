import { useState } from 'react'
import {gql, useQuery} from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const getUniqueGenres = (books) => {
  const assortedGenres = books.reduce((arr, book) => arr.concat(book.genres), [])
  const genres = [...(new Set(assortedGenres))]
  genres.push("all genres")

  return genres
}

const filterByGenre = (unfilteredBooks, genre) => {
  const books = unfilteredBooks.filter((book) => genre === "all genres" ? true : book.genres.includes(genre))
  return books

}

const Books = (props) => {

  let genre = null
  let setGenre= null

  if(props.genreInfo) [genre, setGenre] = props.genreInfo

  const specificGenreResult = useQuery(ALL_BOOKS, { 
    variables: { genre: genre !== "all genres" ? genre : null },
  })

  const allGenreResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (specificGenreResult.loading || allGenreResult.loading) return <div>loading</div>
  
  const books = specificGenreResult.data.allBooks

  const genreList = getUniqueGenres(allGenreResult.data.allBooks)

  return (
     <div>
        <BookList 
          heading='books' 
          subtitle={`in genre ${genre}`} 
          genre={genre}
          books={books}
        />
        { genreList.map((genre) => (
          <button 
            key={genreList.indexOf(genre)} 
            onClick={()=>setGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
  )
}

export default Books
