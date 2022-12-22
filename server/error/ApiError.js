class ApiError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
    //статические функции это функции которые можно вызывать без создания обьекта, то есть можем обращаться на прямую к классу и вызывать ту или иную функцию
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError