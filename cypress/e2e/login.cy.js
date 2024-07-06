describe('Realizando Login', () => {

  beforeEach(function () {
    cy.viewport(1440, 1080)

    cy.fixture('login').then(function (login) {
      this.login = login
    })
  })

  it('Login com Sucesso', function () {

    const users = this.login.user

    cy.postUser(users).then(
      response => {

        const msg = 'Cadastro realizado com sucesso'

        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq(msg)

      }
    )

    cy.visit('https://front.serverest.dev/login')
    cy.contains('h1', 'Login').should('be.visible')

    cy.get('input[data-testid=email]').type(users.email)
    cy.get('input[data-testid=senha]').type(users.password)
    cy.contains('button[data-testid=entrar]', 'Entrar').click()

    cy.contains('h1', `Bem Vindo ${users.nome}`).should('be.visible')

    cy.getUser(users).then(
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

  it('Login Inválido', function () {

    const users = this.login.user

    cy.postUser(users).then(
      response => {

        const msg = 'Cadastro realizado com sucesso'

        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq(msg)

      }
    )

    cy.visit('https://front.serverest.dev/login')
    cy.contains('h1', 'Login').should('be.visible')

    cy.get('input[data-testid=email]').type(users.email)
    cy.get('input[data-testid=senha]').type('pwd1234')
    cy.contains('button[data-testid=entrar]', 'Entrar').click()

    cy.contains('span', `Email e/ou senha inválidos`).should('be.visible')

    cy.login(users).then(
      response => {


        const msg = 'Email e/ou senha inválidos'

        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq(msg)

      }
    )

    cy.getUser(users).then(
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

  it('Email em Branco', function () {

    const users = this.login.user

    cy.postUser(users).then(
      response => {

        const msg = 'Cadastro realizado com sucesso'

        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq(msg)

      }
    )

    cy.visit('https://front.serverest.dev/login')
    cy.contains('h1', 'Login').should('be.visible')

    cy.get('input[data-testid=senha]').type('pwd1234')
    cy.contains('button[data-testid=entrar]', 'Entrar').click()

    cy.contains('span', `Email é obrigatório`).should('be.visible')


    cy.getUser(users).then(
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

  it.only('Password em Branco', function () {

    const users = this.login.user

    cy.postUser(users).then(
      response => {

        const msg = 'Cadastro realizado com sucesso'

        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq(msg)

      }
    )

    cy.visit('https://front.serverest.dev/login')
    cy.contains('h1', 'Login').should('be.visible')

    cy.get('input[data-testid=email]').type(users.email)
    cy.contains('button[data-testid=entrar]', 'Entrar').click()

    cy.contains('span', `Password é obrigatório`).should('be.visible')


    cy.getUser(users).then(
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