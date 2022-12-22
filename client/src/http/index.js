import axios from 'axios'

const react_app_api_url = 'http://localhost:5000/'

//для обычных запросов которые не требуют авторизации
const $host = axios.create({
    //укажем url на который будут запросы
    baseURL: react_app_api_url
})

//к каждому запросу будет автоматически будет подставлятся header.authorization и туда будет добавлятся токен
const $authHost = axios.create({
    baseURL: react_app_api_url
})

// в случае со вторым инстансом нам необходимо подстовлять автоматически токен к каждому запросу
const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

//для инстанса authHost добавляет интерцептер для запроса
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}