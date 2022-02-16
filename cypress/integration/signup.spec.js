import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage';

describe('Signup', () => {
    //var signup = new SignupPage() Exportado instaciado acima
    //     beforeEach(function() {
    //     cy.log('Tudo aq exec ANTES de CADA caso de teste')

    //     //utilizando a massa do arquivo json
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // });

    it('User should be deliver', function () {
        //# instaciando a classe com as funcões do page para usar no step 
        //var signup = new SignupPage()
        var deliver = signupFactory.deliver()

        signup.go()
        signup.Fillform(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
        signup.confirmClose()

    });

    it('Incorrect document', function () {

        //# instaciando a classe com as funcões do page para usar no step 
        //var signup = new SignupPage()
        var deliver = signupFactory.deliver()

        deliver.cpf = 'aasdf123456'

        signup.go()
        signup.Fillform(deliver)
        signup.submit()
        signup.alertMessageshouldBe('Oops! CPF inválido')

    });

    it('Incorrect email', function () {

        //# instaciando a classe com as funcões do page para usar no step 
        //var signup = new SignupPage()

        var deliver = signupFactory.deliver()

        deliver.email = 'teste123456.com'

        signup.go()
        signup.Fillform(deliver)
        signup.submit()
        signup.alertMessageshouldBe('Oops! Email com formato inválido.')
    });

    it('Incorrect cep', function () {

        //# instaciando a classe com as funcões do page para usar no step 
        //var signup = new SignupPage()        
        signup.go()
        cy.get('input[name="postalcode"]').type(' ')
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        signup.alertMessageshouldBe('Informe um CEP válido')
    });

    context('Required Filds', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'document', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
        ]

        before(function () {
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is require`, function () {
                SignupPage.alertMessageshouldBe(msg.output)

            })
        })
    });

    it('Required Filds opcional', function () {
        var nome = 'É necessário informar o nome'
        var cpf = 'É necessário informar o CPF'
        SignupPage.go()
        SignupPage.submit()
        SignupPage.alertMessageshouldBe(nome)
        SignupPage.alertMessageshouldBe(cpf)
        
        //tirar print da suite com sucesso
        cy.screenshot('Required Filds opcional')
    });
});