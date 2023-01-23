const db = require("../models");
const route = require('express').Router()
var Film_Kategoria = db.FIlm_Kategoria

route.get('/', (req, res) => {
    Film_Kategoria.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving connections between movie and category."
            });
        });
})

route.post('/', (req, res) => {
    console.log(req.body)
    Film_Kategoria.create({
        Kategoria_Id: req.body.Kategoria_Id,
        Film_Id: req.body.Film_Id,
        
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating connections between movie and category."
            });
        });
})


exports = module.exports = route