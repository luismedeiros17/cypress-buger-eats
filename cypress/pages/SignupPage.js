

class SignupPage {

    go() {

        //#Função que abre o navegador com resolução ideal

        cy.visit('/')
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    Fillform(deliver) {
        //#Função que preenche o formulario na pagina
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)

        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()
        //cy.contains('.delivery-method li',deliver.delivery_method2).click()
        // cy.contains('.delivery-method li',deliver.delivery_method3).click()

        //#carregar imagens 
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

    }

    submit() {
        //# Função para submeter formulario 
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        //#Função q valida mensagens
        cy.get('.swal2-popup').contains(expectedMessage)

    }

    alertMessageshouldBe(expectedMessage) {
        //cy.get('.alert-error') .should('have.text',expectedMessage)

        //#combinar localiador com texto
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

    confirmClose() {
        //confirmar e fechar form
        cy.get('.swal2-confirm').click()
    }

}

//#Exportando a Page para ser usado em outros steps
//Exortando instanciado
export default new SignupPage;