const db = require("../models");
const route = require('express').Router()
var Opinia = db.Opinia

route.post('/', (req, res) => {
    console.log(req.body)
    Opinia.create({
        Film_Id: req.body.Film_Id,
        Login: req.body.Login,
        Komentarz: req.body.Komentarz,
        Ocena: req.body.Ocena
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating comment."
            });
        });
})

route.get('/findComments/:id', (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    Opinia.findAll({
        where: { Film_Id: id },
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving comment.",
            });
        });
})

route.get("/", (req, res) => {
    Opinia.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving comments.",
            });
        });
})

exports = module.exports = route

