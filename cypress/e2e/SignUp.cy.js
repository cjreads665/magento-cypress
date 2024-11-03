import SignUp from "../PageObjects/SignUp"

const signup = new SignUp();
let invalidEmailFixture, diffPasswords;
describe('Testing of Sign Up registration page', () => {

  before(()=>{
    cy.fixture('invalidEmailSignup').then((userData)=>{
      invalidEmailFixture = userData;
    })
    cy.fixture('diffPasswords').then((userData)=>{
      diffPasswords = userData
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

  it("Verify signing up using no data",()=>{
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

  it("Verify signing up with different password length",()=>{
    cy.fixture('invalidPassword').then((userData)=>{
      userData.forEach(({firstName,lastName,email,password})=>{
        signup.fillFormAndSubmit(firstName,lastName,email,password,password)
        signup.getPasswordErrorMessage().should('be.visible')
        cy.get('#password-strength-meter-label').should('have.text','Weak')
        cy.reload()
        signup.getConfirmPasswordErrorMessage().should('not.exist')
      })
    })
  })

  it("Verify signing up with different passwords for confirm password",()=>{
    diffPasswords.forEach(({firstName,lastName,email,password,cpassword})=>{
      signup.fillFormAndSubmit(firstName,lastName,email,password,cpassword)
      signup.getConfirmPasswordErrorMessage().should('be.visible')
      cy.reload()
      signup.getConfirmPasswordErrorMessage().should('not.exist')
    })
  })

  it.only("Verify signing up with a registered email",()=>{
    signup.fillFormAndSubmit('Ritik','Raj', 'test@pop.com' ,'Test12345678@','Test12345678@')
    signup.getBannerErrorMessage().should('be.visible')
  })


})