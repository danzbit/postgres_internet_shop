require('dotenv').config()
const express = require("express");
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({})) //для работы с файлами
app.use('/api', router)
//обезательно middleware который работает с ошибками обезательно должен идти и регистрироватся в самом конце
app.use(errorHandler)


const start = async () => {
  try {
    await sequelize.authenticate()//с помощью нее будет устанавливатся соединение к БД
    await sequelize.sync()// эта функция будет сверять состояние БД со схемой данных которые мы опишем чуть позже
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
