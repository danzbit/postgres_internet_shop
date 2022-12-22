const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Wrong email or password"));
    }
    const candidat = await User.findOne({ where: { email } });
    if (candidat) {
      return next(ApiError.badRequest("User already exist with current email"));
    }
    const hashPaswword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPaswword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user){
        return next(ApiError.internal("User didnt register with this email"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword){
        return next(ApiError.internal("Wrong Password"));
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token });
  }

  async check(req, res, next) {
    //эта вся функция будет сводится к тому что бы сгенерирвать новый токен и отправить его на клиент
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController();
