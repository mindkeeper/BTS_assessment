const sequelize = require("../../configs/sequelize");
const Checklist = require("../../models/checklist");

const createChecklistHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name } = req.body;
    const userId = req.payload.id;
    const newChecklist = await Checklist.create(
      { name, userId },
      { transaction: t }
    );
    await t.commit();
    return res.sendSuccess(201, { newChecklist });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = createChecklistHandler;
