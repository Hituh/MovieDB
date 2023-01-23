const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Film_Pracownik', {
    Film_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Film',
        key: 'Film_Id'
      }
    },
    Osoba_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Osoba',
        key: 'Osoba_Id'
      }
    },
    Stanowisko: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Film_Pracownik',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Film_Pracownik_pkey",
        unique: true,
        fields: [
          { name: "Film_Id" },
          { name: "Osoba_Id" },
        ]
      },
    ]
  });
};
