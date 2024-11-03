import SignUp from "../PageObjects/SignUp"

const signup = new SignUp();
let invalidEmailFixture;
describe('Testing of Sign Up registration page', () => {

  before(()=>{
    cy.fixture('invalidEmailSignup').then((userData)=>{
      invalidEmailFixture = userData;
    })
  })

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

  it.only("Verify signing up using no data",()=>{
    signup.clickSubmitButton()
    signup.getEmailErrorMessage().should('be.visible')
    signup.getPasswordErrorMessage().should('be.visible')
    signup.getFirstNameErrorMessage().should('be.visible')
    signup.getLastNameErrorMessage().should('be.visible')
  })

  //this test case will FAIL since the website does not have any validation for it
  // please refer to the test cases file fgor further info
  it.skip("Verify signing up using invalid name",()=>{
    cy.fixture('invalidNameData').then((userData)=>{
      userData.forEach(({firstName,lastName})=>{
        signup.enterFirstName(firstName)
        signup.enterLastName(lastName)
        signup.getFirstNameErrorMessage().should('be.visible')
        signup.getLastNameErrorMessage().should('be.visible')
      })
    })
  })

  it("Verify signing up using invalid email",()=>{
    invalidEmailFixture.forEach(({firstName,lastName,email,password})=>{
      signup.fillFormAndSubmit(firstName,lastName,email,password,password)
      signup.getEmailErrorMessage().should('be.visible')
      cy.reload()
      signup.getEmailErrorMessage().should('not.exist')
    })
  })

  it("Verify signing up with different passwords for confirm password",()=>{
    
  })

})