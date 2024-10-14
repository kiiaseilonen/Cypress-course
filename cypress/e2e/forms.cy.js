describe('Form tests', () => {
    beforeEach(() => {
        cy.visit('/forms')
    })
    it('Test subscribe from', () => {
        cy.contains(/Testing Forms/i)
        cy.getDataTest('subscribe-form').find('input').as('subscribe-input')
        cy.get('@subscribe-input').type('test@test.com')
        cy.contains(/Successfully subbed: test@test.com!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Successfully subbed: test@test.com!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: test@test.com!/i).should('not.exist')

        cy.get('@subscribe-input').type('test@test.fi')
        cy.contains(/Invalid email: test@test.fi!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Invalid email: test@test.fi!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Invalid email: test@test.fi!/i).should('not.exist')

        cy.contains(/Fail!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Fail!/i).should('exist')



    })
})