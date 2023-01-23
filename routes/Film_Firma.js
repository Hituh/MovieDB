const db = require("../models");
const route = require('express').Router()
var Film_Firma = db.Film_Firma


route.get('/', (req, res) => {
    Film_Firma.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving connections between movie and producent."
            });
        });
})

route.post('/', (req, res) => {
    console.log(req.body)
    Film_Firma.create({
        Film_Id: req.body.Film_Id,
        Firma_Id: req.body.Firma_Id
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating connections between movie and producent."
            });
        });
})

exports = module.exports = route