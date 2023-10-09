var DataTypes = require("sequelize").DataTypes;
var _up_todolist = require("./up_todolist");
var _up_users = require("./up_users");

function initModels(sequelize) {
  var up_todolist = _up_todolist(sequelize, DataTypes);
  var up_users = _up_users(sequelize, DataTypes);

  up_todolist.belongsTo(up_users, { as: "user", foreignKey: "user_id"});
  up_users.hasMany(up_todolist, { as: "up_todolists", foreignKey: "user_id"});

  return {
    up_todolist,
    up_users
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
