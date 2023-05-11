const sequelize = require("../../configs/sequelize");
const Checklist = require("../../models/checklist");

const getAllHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.payload.id;
    const checkLists = await Checklist.findAll({ where: { userId } });
    if (checkLists.length <= 0)
      return res.sendClientError(404, "Checklist not found");
    await t.commit();
    return res.sendSuccess(200, { checkLists });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = getAllHandler;
