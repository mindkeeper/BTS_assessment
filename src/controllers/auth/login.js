const sequelize = require("../../configs/sequelize");
const Token = require("../../models/token");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, transaction: t });
    if (!user) return res.sendClientError(401, "wrong username/password");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.sendClientError(401, "wrong username/password");
    const payload = {
      id: user.id,
      username: user.username,
    };

    const secretKey = process.env.SECRET_KEY;
    const issuer = process.env.ISSUER;
    const token = jwt.sign(payload, secretKey, { issuer, expiresIn: "10h" });
    await Token.create({ token, userId: user.id });
    await t.commit();
    return res.sendSuccess(200, { ...payload, token });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};
module.exports = loginHandler;
