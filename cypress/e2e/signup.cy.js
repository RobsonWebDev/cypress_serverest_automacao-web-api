describe('Criar Usuario', () => {
  
  beforeEach(function() {
    cy.viewport(1440, 1080)

    cy.fixture('signup').then(function(signup){
        this.signup = signup
    })
  })
  
  it('Cadastro com Sucesso', function() {

    const user = this.signup.create



    cy.visit('https://front.serverest.dev/login')

    cy.contains('h1', 'Login').should('be.visible')


    cy.contains('a[data-testid=cadastrar]', 'Cadastre-se')
      .click()

    cy.contains('h2', 'Cadastro').should('be.visible')

    cy.get('input[data-testid=nome]').type(user.nome)

    cy.get('input[data-testid=email]').type(user.email)

    cy.get('input[data-testid=password]').type(user.password)

    cy.contains('label[for=administrador]', 'Cadastrar como administrador?')
      .parent()
      .get('input[data-testid=checkbox]')
      .click()

    cy.contains('button[data-testid=cadastrar]', 'Cadastrar').click()

    cy.contains('.alert-link', 'Cadastro realizado com sucesso')
      .should('be.visible')

    cy.getUser(user).then(
      response => {

        const userID = response.body.usuarios[0]._id

        expect(userID).to.eq(response.body.usuarios[0]._id)

        cy.deleteUser(userID).then(
          respo => {
            expect(respo.status).to.eq(200)
          }
        )
      }
      
    )
  })

  it('Cadastro Email duplicado', function() {

    const user = this.signup.create

    cy.postUser(user)

    cy.visit('https://front.serverest.dev/login')

    cy.contains('h1', 'Login').should('be.visible')

    cy.contains('a[data-testid=cadastrar]', 'Cadastre-se')
      .click()

    cy.contains('h2', 'Cadastro').should('be.visible')

    cy.get('input[data-testid=nome]').type(user.nome)

    cy.get('input[data-testid=email]').type(user.email)

    cy.get('input[data-testid=password]').type(user.password)

    cy.contains('label[for=administrador]', 'Cadastrar como administrador?')
      .parent()
      .get('input[data-testid=checkbox]')
      .click()

    cy.contains('button[data-testid=cadastrar]', 'Cadastrar').click()

    cy.contains('span', 'Este email já está sendo usado')
      .should('be.visible')
    
    cy.getUser(user).then(
      response => {

        const userID = response.body.usuarios[0]._id

        expect(userID).to.eq(response.body.usuarios[0]._id)

        cy.deleteUser(userID).then(
          respo => {
            expect(respo.status).to.eq(200)
          }
        )
      }
    )
  })
})