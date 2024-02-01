import {gql} from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
        name
    }
    genres
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
export const MY_INFO = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS = gql`
query getAllBooks($genre: String){
  allBooks(genre: $genre){
    title
    published
    author {
        name
    }
    genres
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, 
  $published: Int!, $genres: [String])
  { 
    addBook(
    title: $title, 
    author: $author,
    published: $published,
    genres: $genres
    ){
      title 
      author{
        name
      }
      published
      genres
    }
}
`
export const LOGIN = gql`
mutation login ($username:String!, $password:String!){
    login (username:$username, password:$password){
        value
    }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`