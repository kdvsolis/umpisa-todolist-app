const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('up_todolist', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    task: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'up_users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'up_todolist',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "up_todolist_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
