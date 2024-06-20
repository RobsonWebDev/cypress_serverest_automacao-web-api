Cypress.Commands.add('postUser', (user) => {
    cy.request({
        url: '/usuarios',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('login', (user) => {

    delete user.name
    delete user.administrador

    cy.request({
        url: '/login',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    });
});


Cypress.Commands.add('getUser', (user) => {
    cy.request({
        url: '/usuarios',
        method: 'GET',
        body: user,
        failOnStatusCode: false
    });
});

Cypress.Commands
