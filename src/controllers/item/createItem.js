const sequelize = require("../../configs/sequelize");
const CheckListItem = require("../../models/checkListItem");

const createItemHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { itemName } = req.body;
    const checklistId = req.params.id;
    const checklistItem = await CheckListItem.create(
      { name: itemName, checklistId },
      { transaction: t }
    );

    await t.commit();
    return res.sendSuccess(201, checklistItem);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = createItemHandler;
