Cypress.Commands.add('postUser', (user) => {
    cy.request({
        url: '/usuarios',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    }).then(
        response => {
            return response
        });
});

Cypress.Commands.add('login', (users) => {

    delete users.nome
    delete users.administrador

    cy.request({
        url: '/login',
        method: 'POST',
        body: users,
        failOnStatusCode: false
    });
});


Cypress.Commands.add('getUser', (user) => {

    cy.request({
        url: `/usuarios?email=${user.email}`,
        method: 'GET',
        failOnStatusCode: false
    });
});

Cypress.Commands.add('deleteUser', (userID) => {
    cy.request({
    url: `/usuarios/${userID}`,
        method: 'DELETE',
        failOnStatusCode: false
    })
})
