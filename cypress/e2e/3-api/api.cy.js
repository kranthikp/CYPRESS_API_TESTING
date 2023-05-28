/// <references types="cypres" />

describe('API Testing with Cypress', ()=>{
    it('passes',()=>{
        // TODO
        cy.request('/users/2').then((response) =>{
            cy.log(JSON.stringify(response.body))
            // cy.log(JSON.stringify(response.body.data))
            // cy.log(JSON.stringify(response.body.data.id))
            // cy.log(JSON.stringify(response.body.data.email))
            // cy.log(JSON.stringify(response.body.data.first_name))
            cy.log(JSON.stringify(response.headers))
        })
    })

    it('API Test - Validate headers', () =>{
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
        cy.get('@existingUser')
            .its('status')
            .should('equal', 200)

        cy.request({url: '/users/non-exist', failOnStatusCode: false}).as('nonExistingUser')
        cy.get('@nonExistingUser')
        .its('status')
        .should('equal', 404)
    });

    it.only('API Test - GET Request', () => {
        cy.request({url: '/users/2', method: 'GET'}).as('user')
        cy.get('@user')
        .then((res)=>{
            cy.log(JSON.stringify(res.body))
            expect(res.body.data.id).equal(2)
            expect(res.body.data.email).contain('janet.weaver')
            expect(res.body.data.last_name).not.to.contain('SomeName')
        })
    });
})