describe('Criar Usuario', () => {
  
  beforeEach(function() {
    cy.fixture('signup').then(function(signup){
        this.signup = signup
    })
  })
  
  it('signup', function() {

    const user = this.signup.create

    cy.visit('https://front.serverest.dev/login')

    cy.contains('h1', 'Login').should('be.visible')


    cy.contains('a[data-testid=cadastrar]', 'Cadastre-se')
      .click()

    cy.contains('h2', 'Cadastro').should('be.visible')

    cy.get('input[data-testid=nome]').type(user.name)

    cy.get('input[data-testid=email]').type(user.email)

    cy.get('input[data-testid=password]').type(user.password)

    cy.contains('label[for=administrador]', 'Cadastrar como administrador?')
      .parent()
      .get('input[data-testid=checkbox]')
      .click()

    cy.contains('button[data-testid=cadastrar]', 'Cadastrar').click()

    cy.contains('.alert-link', 'Cadastro realizado com sucesso')
      .should('be.visible')
  })
})