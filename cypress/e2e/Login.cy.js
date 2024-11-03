import Login from "../PageObjects/Login";

const login = new Login();
let registeredEmail, registeredPassword, incorrectEmail, incorrectPassword;


describe('Testing of Login authentication page', () => {

  before(()=>{
    cy.fixture("registeredLoginData").then((data)=>{
      registeredEmail = data.email;
      registeredPassword = data.password;
    })

    cy.fixture("incorrectLoginData").then((data)=>{
      incorrectEmail = data.email;
      incorrectPassword = data.password;''
    })
  })
  
  beforeEach(()=>{
    cy.visit('/');
    cy.get('[class="header links"]').first().find('li.authorization-link').first().click()
    cy.get('.message-error').should('not.exist')
  })

  it("should Verify authentication using no credentials",()=>{
    login.getSubmit()
    cy.get('.message-error').should('exist')
  })

  it("should Verify authentication using no credentials after page loading",()=>{
    cy.wait(2000)
    cy.get('#email-error').should('not.exist')
    cy.get('#pass-error').should('not.exist')
    login.getSubmit()
    cy.get('#email-error').should('exist').should('be.visible')
    cy.get('#pass-error').should('exist').should('be.visible')
  })

  it("Verify authentication using invalid email format and password",()=>{
    cy.fixture('invalidLoginData').then((userData)=>{
      console.log(userData);
      userData.forEach((user)=>{
              
      login.getEmail(user.email)
      login.getPassword(user.password)
      login.getSubmit()
      cy.get('#email-error').should('be.visible')
      cy.reload()
      })
    })
  })

  it("Verify authentication using unregistered credentials",()=>{
      login.getEmail(incorrectEmail)
      login.getPassword(incorrectPassword)
      login.getSubmit()
      cy.get('.message-error').should('exist').should('be.visible')
      login.getEmailTextBox().should('have.value',incorrectEmail)
  })

  it("Verify authentication using registered email and incorrect password.",()=>{
      login.getEmail(registeredEmail)
      login.getPassword("incorrect")
      login.getSubmit()
      cy.get('.message-error').should('exist').should('be.visible')
  })

  it.only("Verify authentication using registered email and no password.",()=>{
      login.getEmail(registeredEmail)
      login.getSubmit()
      cy.get('#pass-error').should('exist').should('be.visible')
  })

})