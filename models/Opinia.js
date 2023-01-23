const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Opinia', {
    Film_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Film',
        key: 'Film_Id'
      }
    },
    Login: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Użytkownik',
        key: 'Login'
      }
    },
    Ocena: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Komentarz: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Opinia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Opinia_pkey",
        unique: true,
        fields: [
          { name: "Film_Id" },
          { name: "Login" },
        ]
      },
    ]
  });
};
