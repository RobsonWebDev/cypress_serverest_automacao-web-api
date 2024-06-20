Cypress.Commands.add('addUser', (user) => {
    cy.request({
        url: '/usuarios',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    });
});