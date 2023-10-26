import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Tests the rendering of the BlogForm component', ()=> {

    const createHandler = jest.fn()
    let container
    let titleInput 
    let authorInput
    let urlInput

    beforeEach(() => {
        container = render(
          <BlogForm
            create={createHandler}
          />
        ).container

        titleInput = screen.getByPlaceholderText('input title')
        authorInput = screen.getByPlaceholderText('input author')
        urlInput = screen.getByPlaceholderText('input url')

      })
    test('Tests the rendering of component', ()=>{
        
        expect(titleInput).toBeDefined()
        expect(authorInput).toBeDefined()
        expect(urlInput).toBeDefined()
    })

    test('Tests the rendering and functionality of component', async () =>{
        const user = userEvent.setup()
        const submitButton = screen.getByText('create')   

        await user.type(titleInput, 'Dummy Title')  
        await user.type(authorInput, 'Dummy Author')   
        await user.type(urlInput, 'http://dummyurl')        
        await user.click(submitButton)
  
        expect(createHandler.mock.calls).toHaveLength(1)
        expect(createHandler.mock.calls[0][0].title).toBe(
            'Dummy Title'
        )
        expect(createHandler.mock.calls[0][0].author).toBe(
            'Dummy Author'
        )
        expect(createHandler.mock.calls[0][0].url).toBe(
            'http://dummyurl'
        )

    })
})

