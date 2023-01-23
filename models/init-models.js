var DataTypes = require("sequelize").DataTypes;
var _FIlm_Kategoria = require("./FIlm_Kategoria");
var _Film = require("./Film");
var _Film_Aktor = require("./Film_Aktor");
var _Film_Firma = require("./Film_Firma");
var _Film_Pracownik = require("./Film_Pracownik");
var _Firma_Produkcyjna = require("./Firma_Produkcyjna");
var _Kategoria = require("./Kategoria");
var _Obserwuje = require("./Obserwuje");
var _Opinia = require("./Opinia");
var _Osoba = require("./Osoba");
var _Użytkownik = require("./Użytkownik");

function initModels(sequelize) {
  var FIlm_Kategoria = _FIlm_Kategoria(sequelize, DataTypes);
  var Film = _Film(sequelize, DataTypes);
  var Film_Aktor = _Film_Aktor(sequelize, DataTypes);
  var Film_Firma = _Film_Firma(sequelize, DataTypes);
  var Film_Pracownik = _Film_Pracownik(sequelize, DataTypes);
  var Firma_Produkcyjna = _Firma_Produkcyjna(sequelize, DataTypes);
  var Kategoria = _Kategoria(sequelize, DataTypes);
  var Obserwuje = _Obserwuje(sequelize, DataTypes);
  var Opinia = _Opinia(sequelize, DataTypes);
  var Osoba = _Osoba(sequelize, DataTypes);
  var Użytkownik = _Użytkownik(sequelize, DataTypes);

  Film.belongsToMany(Firma_Produkcyjna, { as: 'Firma_Id_Firma_Produkcyjnas', through: Film_Firma, foreignKey: "Film_Id", otherKey: "Firma_Id" });
  Film.belongsToMany(Kategoria, { as: 'Kategoria_Id_Kategoria', through: FIlm_Kategoria, foreignKey: "Film_Id", otherKey: "Kategoria_Id" });
  Film.belongsToMany(Osoba, { as: 'Osoba_Id_Osobas', through: Film_Aktor, foreignKey: "Film_Id", otherKey: "Osoba_Id" });
  Film.belongsToMany(Osoba, { as: 'Osoba_Id_Osoba_Film_Pracowniks', through: Film_Pracownik, foreignKey: "Film_Id", otherKey: "Osoba_Id" });
  Film.belongsToMany(Użytkownik, { as: 'Login_Użytkowniks', through: Obserwuje, foreignKey: "Film_Id", otherKey: "Login" });
  Film.belongsToMany(Użytkownik, { as: 'Login_Użytkownik_Opinia', through: Opinia, foreignKey: "Film_Id", otherKey: "Login" });
  Firma_Produkcyjna.belongsToMany(Film, { as: 'Film_Id_Film_Film_Firmas', through: Film_Firma, foreignKey: "Firma_Id", otherKey: "Film_Id" });
  Kategoria.belongsToMany(Film, { as: 'Film_Id_Films', through: FIlm_Kategoria, foreignKey: "Kategoria_Id", otherKey: "Film_Id" });
  Osoba.belongsToMany(Film, { as: 'Film_Id_Film_Film_Aktors', through: Film_Aktor, foreignKey: "Osoba_Id", otherKey: "Film_Id" });
  Osoba.belongsToMany(Film, { as: 'Film_Id_Film_Film_Pracowniks', through: Film_Pracownik, foreignKey: "Osoba_Id", otherKey: "Film_Id" });
  Użytkownik.belongsToMany(Film, { as: 'Film_Id_Film_Obserwujes', through: Obserwuje, foreignKey: "Login", otherKey: "Film_Id" });
  Użytkownik.belongsToMany(Film, { as: 'Film_Id_Film_Opinia', through: Opinia, foreignKey: "Login", otherKey: "Film_Id" });
  FIlm_Kategoria.belongsTo(Film, { as: "Film", foreignKey: "Film_Id"});
  Film.hasMany(FIlm_Kategoria, { as: "FIlm_Kategoria", foreignKey: "Film_Id"});
  Film_Aktor.belongsTo(Film, { as: "Film", foreignKey: "Film_Id"});
  Film.hasMany(Film_Aktor, { as: "Film_Aktors", foreignKey: "Film_Id"});
  Film_Firma.belongsTo(Film, { as: "Film", foreignKey: "Film_Id"});
  Film.hasMany(Film_Firma, { as: "Film_Firmas", foreignKey: "Film_Id"});
  Film_Pracownik.belongsTo(Film, { as: "Film", foreignKey: "Film_Id"});
  Film.hasMany(Film_Pracownik, { as: "Film_Pracowniks", foreignKey: "Film_Id"});
  Obserwuje.belongsTo(Film, { as: "Film", foreignKey: "Film_Id"});
  Film.hasMany(Obserwuje, { as: "Obserwujes", foreignKey: "Film_Id"});
  Opinia.belongsTo(Film, { as: "Film", foreignKey: "Film_Id"});
  Film.hasMany(Opinia, { as: "Opinia", foreignKey: "Film_Id"});
  Film_Firma.belongsTo(Firma_Produkcyjna, { as: "Firma", foreignKey: "Firma_Id"});
  Firma_Produkcyjna.hasMany(Film_Firma, { as: "Film_Firmas", foreignKey: "Firma_Id"});
  FIlm_Kategoria.belongsTo(Kategoria, { as: "Kategorium", foreignKey: "Kategoria_Id"});
  Kategoria.hasMany(FIlm_Kategoria, { as: "FIlm_Kategoria", foreignKey: "Kategoria_Id"});
  Film_Aktor.belongsTo(Osoba, { as: "Osoba", foreignKey: "Osoba_Id"});
  Osoba.hasMany(Film_Aktor, { as: "Film_Aktors", foreignKey: "Osoba_Id"});
  Film_Pracownik.belongsTo(Osoba, { as: "Osoba", foreignKey: "Osoba_Id"});
  Osoba.hasMany(Film_Pracownik, { as: "Film_Pracowniks", foreignKey: "Osoba_Id"});
  Obserwuje.belongsTo(Użytkownik, { as: "Login_Użytkownik", foreignKey: "Login"});
  Użytkownik.hasMany(Obserwuje, { as: "Obserwujes", foreignKey: "Login"});
  Opinia.belongsTo(Użytkownik, { as: "Login_Użytkownik", foreignKey: "Login"});
  Użytkownik.hasMany(Opinia, { as: "Opinia", foreignKey: "Login"});

  return {
    FIlm_Kategoria,
    Film,
    Film_Aktor,
    Film_Firma,
    Film_Pracownik,
    Firma_Produkcyjna,
    Kategoria,
    Obserwuje,
    Opinia,
    Osoba,
    Użytkownik,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
