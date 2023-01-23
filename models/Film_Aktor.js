const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Film_Aktor', {
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
    Rola: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Film_Aktor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Film_Aktor_pkey",
        unique: true,
        fields: [
          { name: "Film_Id" },
          { name: "Osoba_Id" },
        ]
      },
    ]
  });
};
