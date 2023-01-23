const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Film', {
    Film_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    'Tytuł': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Data_Wydania: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    'Język': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Długość': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Opis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Zdjęcie': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Film',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Film_pkey",
        unique: true,
        fields: [
          { name: "Film_Id" },
        ]
      },
    ]
  });
};
