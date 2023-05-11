const sequelize = require("../../configs/sequelize");
const Checklist = require("../../models/checklist");

const deleteChecklistHanlder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const checklist = await Checklist.findByPk(req.params.id);
    if (!checklist) return res.sendClientError(404, "Checklist not found");
    await checklist.destroy();
    return res.sendSuccess(200, checklist);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = deleteChecklistHanlder;
