const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {

    return (
        blogs
            .map(blog => blog.likes)
            .reduce((sum, curr) => sum+curr)
        )
}

const favoriteBlog = (blogs) => {

/*   let blogLikes =  blogs.map(blog => blog.likes)

  let favoriteBlogLikes = blogLikes.reduce((sum, curr) => {
        return sum > curr ? sum: curr
      })*/
  let mostLikes = 0
  //let favoriteBlogIndex = 0 

  blogs.forEach((blog, index) => {
    if(blog.likes > mostLikes ){
      mostLikes = blog.likes
      //favoriteBlogIndex = index
    }
  })

  return blogs.find(
    (blog) => blog.likes === mostLikes
  )
}

const mostBlogs = (blogs) => {

  let authors = blogs.map(blog => blog.author)
  let uniqAuthors = _.uniq(authors)
  let mostBlogsCount = 0
  let mostBlogsAuthor = ""

  uniqAuthors.forEach((uniqAuthor, index) =>{

   let currBlogs = _.filter(authors, (author) => { return author === uniqAuthor})
   let currBlogCount = currBlogs.length

   if(currBlogCount > mostBlogsCount){
    mostBlogsCount = currBlogCount
    mostBlogsAuthor = uniqAuthor
   }
  })

  return {blogs: mostBlogsCount, author: mostBlogsAuthor}

}

const mostLikes = (blogs) => {
  const {author, likes} = favoriteBlog(blogs)
  //console.log(favoriteBlog(blogs))
  return {author, likes}
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }