class Login{

    enterEmail(email){
        return cy.get('#email').type(email)
    }

    getEmailTextBox(){
        return cy.get('#email')
    }

    enterPassword(password){
        return cy.get('#pass').type(password)
    }

    clickSubmit(){
        return cy.get('#send2').click({force: true})
    }

    getPasswordError(){
        return cy.get('#pass-error')
    }

    getEmailError(){
        return cy.get('#email-error')
    }

}

export default Login