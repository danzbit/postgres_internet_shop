const {Type} = require('../models/models') 
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        //сразу делаем диструктуризацию из тела запроса по сколько это подзапрос и у него есть тело извлекаем название этого типа
        //затем с помощью функции create() этот тип мы создаем
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        //findAll() вернет нам все существующие записи которые есть в БД
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()