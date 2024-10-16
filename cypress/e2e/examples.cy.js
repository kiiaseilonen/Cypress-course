describe('Various examples', () => {
    beforeEach(() => {
        cy.visit('/examples')
    })
    it('multi-page testing', () => {
        cy.getDataTest('nav-why-cypress').click();
        cy.location("pathname").should("equal", "/")

        cy.getDataTest('nav-overview').click();
        cy.location("pathname").should("equal", "/overview")

        cy.getDataTest('nav-fundamentals').click();
        cy.location("pathname").should("equal", "/fundamentals")

        cy.getDataTest('nav-forms').click();
        cy.location("pathname").should("equal", "/forms")

        cy.getDataTest('nav-examples').click();
        cy.location("pathname").should("equal", "/examples")
        
        cy.getDataTest('nav-component').click();
        cy.location("pathname").should("equal", "/component")

        cy.getDataTest('nav-best-practices').click();
        cy.location("pathname").should("equal", "/best-practices")
    })

    it('intercepts', () => {
        cy.intercept("POST", 'http://localhost:3000/examples', {
            fixture: 'example.json'
        })
        cy.getDataTest('post-button').click();
    })

    it('grudges', () => {

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
        })

        cy.getDataTest('clear-grudges-button').should('not.exist')

        cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges')

        cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('First grudge on the list')
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 1)
        })

        cy.getDataTest('grudge-list-title').should('have.text', 'Grudges')

        cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('Second grudge on the list')
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 2)
            cy.get('li').its(0).should('contains.text', 'First grudge on the list')
            cy.get('li').its(1).should('contains.text', 'Second grudge on the list')
        })

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').its(0).within(() => {
                cy.get('button').click()
            })
            cy.get('li').should('have.length', 1)  
        })  

        cy.getDataTest('clear-grudges-button').click()
        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
        })

    })
})