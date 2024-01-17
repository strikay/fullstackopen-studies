import React, {useState} from 'react'

const BlogForm = ({create}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogCreation = (event) => {
        event.preventDefault()

        const blogObject = {author, title, url}
        create(blogObject)

        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={handleBlogCreation}>
                <div>
                    title:<input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='input title'/>
                </div>
                <div>
                    author:<input id='author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='input author'/>
                </div>
                <div>
                    url:<input id='url' type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='input url'/>
                </div>
                <button id='create-blog' type='submit'>create</button>
            </form>
        </>
    )
}

export default BlogForm