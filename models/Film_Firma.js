const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Film_Firma', {
    Firma_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Firma_Produkcyjna',
        key: 'Firma_Id'
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
    tableName: 'Film_Firma',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Film_Firma_pkey",
        unique: true,
        fields: [
          { name: "Film_Id" },
          { name: "Firma_Id" },
        ]
      },
    ]
  });
};
