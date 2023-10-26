describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
        username: "princeofcode",
        name: "Prince Kode",
        password: "happycoding"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    const user2 = {
      username: "princessofcode",
      name: "Princess Kode",
      password: "merrycoding"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit('localhost:5173/')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('princeofcode')
      cy.get('#password').type('happycoding')
      cy.get('#login-button').click()
      cy.contains('Prince Kode logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('princeofcode')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password').as('notification')
      cy.get('@notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({username: "princeofcode", password: "happycoding"})
      })
  
      it('A blog can be created', function() {
        cy.contains('create blog').click()
        cy.get('#title').type('Writing tests is fun')
        cy.get('#author').type('Prince Kode')
        cy.get('#url').type('http://someuselessurl')
        cy.get('#create-blog').click()

        cy.contains('Writing tests is fun')
      })

      describe('When blog was created', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Writing tests is fun', 
            author: 'Prince Kode', 
            url:'http://someuselessurl', 
            likes:0
          })
          cy.createBlog({
            title: 'Cypress tests are amazing', 
            author: 'Prince Kode', 
            url:'http://someuselessurl2', 
            likes:0
          })
          cy.createBlog({
            title: 'An optional discussion of Cypress', 
            author: 'Prince Kode', 
            url:'http://someuselessurl3', 
            likes:0
          })
        })
        it('A blog can be liked', function() {
          cy.contains('Cypress tests are amazing').parent().contains('view').click()
          cy.contains('like').click()
          cy.contains('likes 1')
        })
        it('A blog can be deleted by its creator', function() {
          cy.contains('An optional discussion of Cypress').parent().contains('view').click()
          cy.contains('remove').click()
          cy.get('html').should('not.contain', 'An optional discussion of Cypress')
        })

        describe('When a different users log in', function() {

          it('A user who did not create a blog can not see its remove button', function(){
            cy.logout()
            cy.login({username: "princessofcode", password: "merrycoding"})

            cy.contains('Cypress tests are amazing').parent().as('blogDiv')
            cy.get('@blogDiv').contains('view').click()
            cy.get('@blogDiv').should('not.contain', 'remove')
          })
          it('But the creator of the blog can see its remove button', function(){
            cy.logout()
            cy.login({username: "princeofcode", password: "happycoding"})
            
            cy.contains('Cypress tests are amazing').parent().as('blogDiv')
            cy.get('@blogDiv').contains('view').click()
            cy.get('@blogDiv').should('contain', 'remove')
          })
        })

        describe('When several blogs are liked', function() {
          beforeEach(function(){
            cy.get('.blogContainer').then(async (blogContainers) => {

              for (let i =0; i<blogContainers.length; i++){
                cy.wrap(blogContainers[i]).contains('view').click()

                for (let j = 0 ; j<=i; j++){
                  cy.wrap(blogContainers[i]).contains(`likes ${j}`).contains('like').click()
                }
              }
            })
          })

          it('Blog with most likes is at the top', function(){
            cy.get('.blog').eq(0).should('contain', 'An optional discussion of Cypress')
            cy.get('.blog').eq(1).should('contain', 'Cypress tests are amazing')
            cy.get('.blog').eq(2).should('contain', 'Writing tests is fun')
          })
        })

      })
    })
  
  })
})