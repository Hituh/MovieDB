const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Obserwuje', {
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
    }
  }, {
    sequelize,
    tableName: 'Obserwuje',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Obserwuje_pkey",
        unique: true,
        fields: [
          { name: "Film_Id" },
          { name: "Login" },
        ]
      },
    ]
  });
};
