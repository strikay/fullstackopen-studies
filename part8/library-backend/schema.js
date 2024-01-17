const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book]
    allAuthors: [Author]
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
        title:String!, 
        author:String!, 
        published:Int!, 
        genres:[String]
    ):Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

module.exports = typeDefs