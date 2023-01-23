const db = require("../models");
const route = require("express").Router();
var Film = db.Film;
var Osoba = db.Osoba;
const Sequelize = require('sequelize');
const initModels = require("../models/init-models");

const sequelize = new Sequelize('SBD', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: '34.76.19.152'
  }
  );
  var models = initModels(sequelize)

route.get("/", (req, res) => {
    Film.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving movies.",
            });
        });
});

route.get("/:id", (req, res) => {
    const id = req.params.id;

    Film.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find movie with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving movie with id=" + id,
            });
        });
});

route.post("/update", (req, res) => {
    console.log(req.body);
    Film.update({
        Tytuł: req.body.Tytuł,
        Data_Wydania: req.body.Data_Wydania,
        Długość: req.body.Długość,
        Opis: req.body.Opis,
        Zdjęcie: req.body.Zdjęcie,
        Język: req.body.Język,
    }, {where: {Film_Id: req.body.Film_Id}})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while updating movie.",
            });
        });
});

route.post("/delete", (req, res) => {
    console.log(req.body);
    Film.destroy({
    where: {Film_Id: req.body.Film_Id},cascade:true})
        .then((data) => {
            res.send("Super");
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting movie.",
            });
        });
});


route.delete("/", (req, res) => {
    const id = req.body.Film_Id;

    Film.destroy({
        where: { Film_Id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Movie was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Movie with id=" + id,
            });
        });
});

route.post("/", (req, res) => {
    console.log(req.body);
    Film.create({
        Tytuł: req.body.Tytuł,
        Data_Wydania: req.body.Data_Wydania,
        Długość: req.body.Długość,
        Opis: req.body.Opis,
        Zdjęcie: req.body.Zdjęcie,
        Język: req.body.Język,
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating movie.",
            });
        });
});

route.get("/findActors/:id", (req, res) => {
    const id = req.params.id;

    models.Film.findOne({ where: { Film_Id: id }, include: { model: models.Osoba, as: 'Osoba_Id_Osobas' } })
        .then((data) => {
            res.send(JSON.stringify(data, null, 2))
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while finding actors.",
            });
        });
})

route.get("/findCategories/:id", (req, res) => {
    const id = req.params.id;

    models.Film.findOne({ where: { Film_Id: id }, include: { model: models.Kategoria, as: 'Kategoria_Id_Kategoria' } })
        .then((data) => {
            res.send(JSON.stringify(data, null, 2))
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while finding categories.",
            });
        });
})

route.get("/findCompanies/:id", (req, res) => {
    const id = req.params.id;

    models.Film.findOne({ where: { Film_Id: id }, include: { model: models.Firma_Produkcyjna, as: 'Firma_Id_Firma_Produkcyjnas' } })
        .then((data) => {
            res.send(JSON.stringify(data, null, 2))
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while finding producents.",
            });
        });
})

exports = module.exports = route;
