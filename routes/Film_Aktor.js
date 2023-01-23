const db = require("../models");
const route = require('express').Router()
var Film_Aktor = db.Film_Aktor

route.get('/', (req, res) => {
    Film_Aktor.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving connections between movie and actors."
            });
        });
})

route.post('/', (req, res) => {
    console.log(req.body)
    Film_Aktor.create({
        Film_Id: req.body.Film_Id,
        Osoba_Id: req.body.Osoba_Id,
        Rola: req.body.Rola
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating connections between movie and actors."
            });
        });
})

exports = module.exports = route