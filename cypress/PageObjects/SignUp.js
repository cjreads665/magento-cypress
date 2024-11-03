class SignUp {
  //get elements
  getFirstName() {
    return cy.get("#firstname");
  }

  getLastName() {
    return cy.get("#lastname");
  }

  getEmail() {
    return cy.get("#email_address");
  }

  getPassword() {
    return cy.get("#password");
  }

  getConfirmPassword() {
    return cy.get("#password-confirmation");
  }

  getSubmitButton() {
    return cy.get('form button.action.submit.primary[type="submit"]');
  }

  //write operations
  enterFirstName(name) {
    this.getFirstName().clear().type(name);
  }

  enterLastName(name) {
    this.getLastName().clear().type(name);
  }

  enterEmail(email) {
    this.getEmail().clear().type(email);
  }

  enterPassword(password) {
    this.getPassword().clear().type(password);
  }

  enterConfirmPassword(password) {
    this.getConfirmPassword().clear().type(password);
  }

  clickSubmitButton() {
    this.getSubmitButton().click();
  }

  //error messages
  getFirstNameErrorMessage() {
    return cy.get("#firstname-error");
  }

  getLastNameErrorMessage() {
    return cy.get("#lastname-error");
  }

  getEmailErrorMessage() {
    return cy.get("#email_address-error");
  }

  getPasswordErrorMessage() {
    return cy.get("#password-error");
  }

  getConfirmPasswordErrorMessage() {
    return cy.get("#password-confirmation-error");
  }

  getBannerErrorMessage(){
    return cy.get('.message-error')
  }

  assertUrlContains(url) {
    cy.url().should("include", url);
  }

  fillFormAndSubmit(fname, lname, email, password, confirmPassword) {
    this.enterFirstName(fname);
    this.enterLastName(lname);
    this.enterEmail(email);
    this.enterPassword(password);
    this.enterConfirmPassword(confirmPassword);
    this.clickSubmitButton();
  }
}

export default SignUp;
