const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Firma_Produkcyjna', {
    Firma_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nazwa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Siedziba: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Firma_Produkcyjna',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Firma_Produkcyjna_pkey",
        unique: true,
        fields: [
          { name: "Firma_Id" },
        ]
      },
    ]
  });
};
