const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Użytkownik', {
    Login: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    EMail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'Hasło': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    StatusPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    TypKonta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'Zdjęcie': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Użytkownik',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Użytkownik_pkey",
        unique: true,
        fields: [
          { name: "Login" },
        ]
      },
    ]
  });
};
