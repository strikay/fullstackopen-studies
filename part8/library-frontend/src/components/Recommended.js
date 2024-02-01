import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import BookList from "./BookList"

const Recommended = (props) => {
    const genre = props.favoriteGenre

    const result = useQuery(ALL_BOOKS, { 
        variables: { genre: genre },
      })

      if (!props.show) {
        return null
      }
    
      if (result.loading) return <div>loading</div>
      
      const books = result.data.allBooks

    return (
        <BookList 
            books={books} 
            heading={'recommendations'}
            subtitle={"books in your favorite genre "}
            genre={genre}
        />
    )
}

export default Recommended