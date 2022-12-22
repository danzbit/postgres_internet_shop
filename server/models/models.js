const sequelize = require("../db");
const { DataTypes } = require("sequelize"); //импортируем класс с помощью которого описываются типы того или иного поля string, int, mas

//описываем первую модель. Первым параметром указываем название модели
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

//на внешние ключи пока что не обращаем внимаение их sequelize подставит сам
const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Devise = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Описываем как эти элементы связаны друг с другом то есть строим внешние ключи

User.hasOne(Basket);
Basket.belongsTo(User);

//один пользователь может иметь несколько оценок
User.hasMany(Rating);
Rating.belongsTo(User);

Type.hasMany(Devise);
Devise.belongsTo(Type);

Brand.hasMany(Devise);
Devise.belongsTo(Brand);

Devise.hasMany(Rating);
Rating.belongsTo(Devise);

Devise.hasMany(BasketDevice);
BasketDevice.belongsTo(Devise);

Devise.hasMany(DeviceInfo, { as: 'info' }); //либо hasMany || hasOne, таким образом мы сообщаем что одна запись девайса в БД содержит много записей с характеристиками
DeviceInfo.belongsTo(Devise); // а для нее мы указываем что эта сущность пренадлежит Device

// на данно моменте напишем вид связи между типом и брендом
Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });
//в through мы указываем связующюю таблицу

module.exports = {
  User,
  Basket,
  BasketDevice,
  Devise,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
};
