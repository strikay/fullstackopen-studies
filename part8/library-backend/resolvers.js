const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { GraphQLError } = require('graphql')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
  
        if(!args.genre) return Book.find({}).populate('author')
        return Book.find({genres: { $in: [args.genre] }}).populate('author')
      },
      allAuthors: async () => Author.find({}),
      me: async (root, args, context) => context.currentUser
  
    },
    Author: {
      bookCount: async (root) => {
        return root.books.length
      }
    },

    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },

    Mutation: {
      addBook: async (root, args, {currentUser}) => {
          let author = await Author.findOne({name: args.author})
          let book
  
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: { code: 'BAD_USER_INPUT', }
            })
          }
  
          try{ 
            if (!author) {
                author = await (new Author({name: args.author, books: []})).save()
            }
            book = new Book({...args, author: author._id})
            author.books = author.books.concat(book._id)
            await author.save()
            await book.save()
  
          }catch (error){
            let invalidArgs
            if(args.author.length < 4) invalidArgs = args.author
            if(args.title.length < 5) invalidArgs = args.title
  
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs,
                error
              }
            })
          }

          bookAdded =  book.populate('author')

          pubsub.publish('BOOK_ADDED', { bookAdded: bookAdded })

          return bookAdded
      },
      editAuthor: async (root, args, { currentUser }) => {
  
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: { code: 'BAD_USER_INPUT', }
            })
          }
          
          const born = args.setBornTo
          const author = await Author.findOne({name: args.name})
          if (!author) return null
  
          author.born = born
          
          return author.save()
      },
      createUser: async (root, args) => {
        const user = new User({...args})
        return user.save()
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
  
        if (!user || args.password !== 'secret'){
          throw new GraphQLError('Wrong Credentials', {
            extensions:{
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          id:user._id,
          username: user.username
        }
  
        const token = jwt.sign(userForToken, process.env.JWT_SECRET)
        return {value: token}
      }
    }
  }

  module.exports = resolvers