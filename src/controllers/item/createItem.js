const sequelize = require("../../configs/sequelize");
const CheckListItem = require("../../models/checkListItem");

const createItemHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { itemName } = req.body;
    console.log(
      "--------------------------------------->>>>>>>>>>>>>",
      itemName,
      req.body
    );
    const checkListId = req.params.id;
    const checkListItem = await CheckListItem.create(
      { name: itemName, checkListId },
      { transaction: t }
    );
    await t.commit();
    return res.sendSuccess(201, checkListItem);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = createItemHandler;
