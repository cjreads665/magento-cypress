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
        return cy.get('#send2').click()
    }

    getPasswordError(){
        return cy.get('#pass-error')
    }

}

export default Login