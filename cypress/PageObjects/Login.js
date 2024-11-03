class Login{

    getEmail(email){
        return cy.get('#email').type(email)
    }

    getEmailTextBox(){
        return cy.get('#email')
    }

    getPassword(password){
        return cy.get('#pass').type(password)
    }

    getSubmit(){
        return cy.get('#send2').click()
    }

}

export default Login