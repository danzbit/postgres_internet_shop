const uuid = require("uuid");
const path = require("path");
const { Devise, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files; // для того что бы получить картинку, после того как файл мы получили нам для него необходимо сгенерировать уникальное имя
      //что бы потом по этом имени мы могли файл получать
      let fileName = uuid.v4() + ".jpg";
      //что бы файл после получение переместить в папку static
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Devise.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
            DeviceInfo.create({
                title: i.title,
                description: i.description,
                deviceId: device.id
            })
        )
    }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit; // отступ
    let device;
    if (!brandId && !typeId) {
      //findAndCountAll у нас в запросе по конкретному товару будет показывать сколько всего товаров и эта функция предназначена для пагинации
      device = await Devise.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      device = await Devise.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      device = await Devise.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      device = await Devise.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(device);
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      const device = await Devise.findOne(
          {
              where: {id},
              include: [{model: DeviceInfo, as: 'info'}]
          },
      )
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DeviceController();
