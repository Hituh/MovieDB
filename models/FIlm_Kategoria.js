const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FIlm_Kategoria', {
    Kategoria_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Kategoria',
        key: 'Kategoria_Id'
      }
    },
    Film_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Film',
        key: 'Film_Id'
      }
    }
  }, {
    sequelize,
    tableName: 'FIlm_Kategoria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "FIlm_Kategoria_pkey",
        unique: true,
        fields: [
          { name: "Kategoria_Id" },
          { name: "Film_Id" },
        ]
      },
    ]
  });
};
