const { Op } = require("sequelize");
const sequelize = require("../../configs/sequelize");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const registerHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findAll({
      where: {
        [Op.or]: [{ email }, { username }],
      },
      transaction: t,
    });
    console.log(existingUser.length);
    if (existingUser.length > 0) {
      if (existingUser.length > 1)
        return res.sendClientError(400, "username or email already exist");
      let message = "";
      if (existingUser[0].username === username)
        message = "username already exist";
      if (existingUser[0].email === email) message = "email already exist";
      return res.sendClientError(400, message);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      { username, email, password: hashedPassword },
      { transaction: t }
    );
    await t.commit();
    return res.sendSuccess(201, { newUser });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = registerHandler;
