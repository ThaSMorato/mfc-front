describe('Home e2e test', () => {
  it('Should log in', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Sign up').first().click()

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('[role="dialog"] input[name="email"]').type('jhon_doe@mail.com')
    cy.get('[role="dialog"] input[name="password"]').type('pass123')

    cy.get('[role="dialog"] button[type="submit"]').click()

    cy.contains('Sign up').should('not.exist')

    cy.contains('Log out').should('be.visible')
  })

  it('Should log out', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Sign up').first().click()

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('[role="dialog"] input[name="email"]').type('jhon_doe@mail.com')
    cy.get('[role="dialog"] input[name="password"]').type('pass123')

    cy.get('[role="dialog"] button[type="submit"]').click()

    cy.contains('Sign up').should('not.exist')

    cy.contains('Log out').should('be.visible')

    cy.contains('Log out').first().click()

    cy.contains('Log out').should('not.exist')

    cy.contains('Sign up').should('be.visible')
  })

  it('Should be able to apply when logged in', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Sign up').first().click()

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('[role="dialog"] input[name="email"]').type('jhon_doe@mail.com')
    cy.get('[role="dialog"] input[name="password"]').type('pass123')

    cy.get('[role="dialog"] button[type="submit"]').click()

    cy.contains('Sign up').should('not.exist')

    cy.contains('Log out').should('be.visible')

    cy.contains('Turnos').first().click()

    cy.contains('Aplicar').first().click()

    cy.contains('Aplicado para o turno').should('be.visible')
  })

  it('Should not be able to apply when logged in', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Sign up').should('be.visible')

    cy.contains('Turnos').first().click()

    cy.contains('Aplicar').should('not.exist')
  })
})
