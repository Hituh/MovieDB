const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Osoba', {
    Osoba_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    'Imię': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Nazwisko: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Data_Urodzenia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Kraj_Pochodzenia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Zdjęcie': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Osoba',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Actor_pkey",
        unique: true,
        fields: [
          { name: "Osoba_Id" },
        ]
      },
    ]
  });
};
