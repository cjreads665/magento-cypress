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
    cy.url().should("include","/customer/account/login")
    //ensuring no error is present already
    cy.get('.message-error').should('not.exist')
    cy.get('#email-error').should('not.exist')
    cy.get('#pass-error').should('not.exist')
  })

  it("should Verify authentication using no credentials",()=>{
    login.clickSubmit()
    cy.get('.message-error').should('exist')
  })

  it("should Verify authentication using no credentials after page loading",()=>{
    cy.wait(2000)
    login.clickSubmit()
    cy.get('#email-error').should('exist').should('be.visible')
    cy.get('#pass-error').should('exist').should('be.visible')
  })

  it("Verify authentication using invalid email format and password",()=>{
    cy.fixture('invalidLoginData').then((userData)=>{
      console.log(userData);
      userData.forEach((user)=>{
              
      login.enterEmail(user.email)
      login.enterPassword(user.password)
      login.clickSubmit()
      cy.get('#email-error').should('be.visible')
      cy.reload()
      })
    })
  })

  it("Verify authentication using unregistered credentials",()=>{
      login.enterEmail(incorrectEmail)
      login.enterPassword(incorrectPassword)
      login.clickSubmit()
      cy.get('.message-error').should('exist').should('be.visible')
      login.enterEmailTextBox().should('have.value',incorrectEmail)
  })

  it("Verify authentication using registered email and incorrect password.",()=>{
      login.enterEmail(registeredEmail)
      login.enterPassword("incorrect")
      login.clickSubmit()
      cy.get('.message-error').should('exist').should('be.visible')
  })

  //please refer the test case sheet for this particular test case
  it("Verify authentication using registered email and no password.",()=>{
      login.enterEmail(registeredEmail)
      cy.wait(1000)
      login.clickSubmit()
      login.getPasswordError().should('exist').should('be.visible')
  })

})