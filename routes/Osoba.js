const db = require("../models");
const route = require('express').Router()
var Osoba = db.Osoba
var Film = db.Film

route.get('/', (req, res) => {
    Osoba.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving people."
            });
        });
})
route.post('/', (req, res) => {
    console.log(req.body)
    Osoba.create({
        Imię: req.body.Imię,
        Nazwisko: req.body.Nazwisko,
        Data_Urodzenia: req.body.Data_Urodzenia,
        Kraj_Pochodzenia: req.body.Kraj_Pochodzenia,
        Zdjęcie: req.body.Zdjęcie,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating person."
            });
        });
})

route.post("/delete", (req, res) => {
    console.log(req.body);
    Osoba.destroy({
    where: {Osoba_Id: req.body.Osoba_Id},cascade:true})
        .then((data) => {
            res.send("poszło");
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting person.",
            });
        });
});


route.post("/update", (req, res) => {
    console.log(req.body);
    Osoba.update({
        Imię: req.body.Imię,
        Nazwisko: req.body.Nazwisko,
        Data_Urodzenia: req.body.Data_Urodzenia,
        Kraj_Pochodzenia: req.body.Kraj_Pochodzenia,
        Zdjęcie: req.body.Zdjęcie,
    }, {where: {Osoba_Id: req.body.Osoba_Id}})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while updating person.",
            });
        });
});

route.post('/findId', (req, res) => {
    Osoba.findOne({
        where: {
            Imię: req.body.Imię,
            Nazwisko: req.body.Nazwisko
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving person."
            });
        });
})
exports = module.exports = route