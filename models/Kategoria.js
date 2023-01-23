const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Kategoria', {
    Kategoria_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nazwa: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Kategoria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Kategoria_pkey",
        unique: true,
        fields: [
          { name: "Kategoria_Id" },
        ]
      },
    ]
  });
};
