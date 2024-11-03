import SignUp from "../PageObjects/SignUp"

const signup = new SignUp();

describe('Testing of Sign Up registration page', () => {

  beforeEach(()=>{
    cy.visit('/')
    cy.get('[class="header links"]').first().find('li.authorization-link').next().click()
    cy.url().should('include', '/customer/account/create/')
    // placing checks for error messages in DOM
    signup.getFirstNameErrorMessage().should('not.exist')
    signup.getLastNameErrorMessage().should('not.exist')
    signup.getEmailErrorMessage().should('not.exist')
    signup.getPasswordErrorMessage().should('not.exist')
    signup.getConfirmPasswordErrorMessage().should('not.exist')
  })

  //this test case will FAIL since the website does not have any validation for it
  // please refer to the test cases file fgor further info
  it.skip("Verify signing up using invalid name",()=>{
    cy.fixture('invalidNameData').then((userData)=>{
      userData.forEach(({email,firstName,lastName,password})=>{
        signup.enterFirstName(firstName)
        signup.enterLastName(lastName)
        signup.getFirstNameErrorMessage().should('be.visible')
        signup.getLastNameErrorMessage().should('be.visible')
      })
    })
  })

  it.only("Verify signing up using invalid email",()=>{
    
  })

})