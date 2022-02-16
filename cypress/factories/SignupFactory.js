var faker = require('faker')
var cpfake = require('gerador-validador-cpf')

export default{

    deliver: function (){
        
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpfake.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '11988888888',
            address: {
                postalcode: '06150080',
                street: 'Rua Doutor Pedro dos Santos Figueiredo',
                number: '99',
                details: 'casa',
                district: 'Veloso',
                city_state: 'Osasco/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg' 
        }

        return data
    }
}