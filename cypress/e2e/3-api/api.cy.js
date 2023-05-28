/// <references types="cypres" />

describe('API Testing with Cypress', () => {
  it('passes', () => {
    // TODO
    cy.request('/users/2').then((response) => {
      cy.log(JSON.stringify(response.body))
      // cy.log(JSON.stringify(response.body.data))
      // cy.log(JSON.stringify(response.body.data.id))
      // cy.log(JSON.stringify(response.body.data.email))
      // cy.log(JSON.stringify(response.body.data.first_name))
      cy.log(JSON.stringify(response.headers))
    })
  })

  it('API Test - Validate headers', () => {
    cy.request('/users/2').as('user')
    cy.get('@user')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')

    cy.get('@user')
      .its('headers')
      .its('connection')
      .should('include', 'keep-alive')
  })

  it('API Test - Status Codes', () => {
    cy.request('/users/2').as('existingUser')
    cy.get('@existingUser').its('status').should('equal', 200)

    cy.request({ url: '/users/non-exist', failOnStatusCode: false }).as(
      'nonExistingUser'
    )
    cy.get('@nonExistingUser').its('status').should('equal', 404)
  })

  it('API Test - GET Request', () => {
    cy.request({ url: '/users/2', method: 'GET' }).as('user')
    cy.get('@user').then((res) => {
      cy.log(JSON.stringify(res.body))
      expect(res.body.data.id).equal(2)
      expect(res.body.data.email).contain('janet.weaver')
      expect(res.body.data.last_name).not.to.contain('SomeName')

      const UserID = res.body.data.id
      expect(UserID).to.equal(2)
    })
  })

  it('API Test - POST Request', () => {
    cy.request({
      url: '/login',
      method: 'POST',
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    }).as('loginRequest')

    cy.get('@loginRequest').its('status').should('equal', 200)
    cy.get('@loginRequest').then((res) => {
      expect(res.body.token).to.equal('QpwL5tke4Pnpja7X4')
      cy.log(res.body.token)
    })
  })

  it('API Test - POST Request - Error', () => {
    cy.request({
      url: '/login',
      method: 'POST',
      failOnStatusCode: false,
      body: {
        email: 'eve.holt@reqres.in'
      },
    }).as('loginRequest')

    cy.get('@loginRequest').its('status').should('equal', 400)
    cy.get('@loginRequest').then((res) => {
      expect(res.body.error).to.equal('Missing password')
      cy.log(res.body.error)
    })
  })

  it('API Test - DELETE Request', () => {
    cy.request({
      url: '/users/2',
      method: 'DELETE',
    }).as('deleteUser')

    cy.get('@deleteUser').its('status').should('equal', 204)
  })

  it('API Test - PUT Request', () => {
    cy.request({
      url: '/users/2',
      method: 'PUT',
      body: {
        name: 'name-update'
      },
    }).as('updateUser')

    cy.get('@updateUser').its('status').should('equal', 200)
    cy.get('@updateUser').then((res)=>{
        expect(res.body.name).to.equal('name-update')
    })
  })
})
