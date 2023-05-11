const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const isLogin = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.sendClientError(403, "You have to Login First");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.sendClientError(403, "You have to Login First");
    const checkToken = await Token.findOne({ where: { token } });
    if (!checkToken) return res.sendClientError(403, "You have to Login First");
    const { SECRET_KEY, issuer } = process.env;
    const payload = jwt.verify(token, SECRET_KEY, { issuer });
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.sendServerError(error);
  }
};

module.exports = isLogin;
