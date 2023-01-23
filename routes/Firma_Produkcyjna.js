const db = require("../models");
const route = require('express').Router()
var Firma_Produkcyjna = db.Firma_Produkcyjna

route.get("/", (req, res) => {
    Firma_Produkcyjna.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving producents.",
            });
        });
});

route.post('/findId', (req, res) => {
    Firma_Produkcyjna.findOne({
        where: {
            Nazwa: req.body.Nazwa
        }
    })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving producent."
          });
      });
}) 

route.get("/:id", (req, res) => {
    const id = req.params.id;

    Firma_Produkcyjna.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find producent with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving producent with id=" + id,
            });
        });
});

route.post("/", (req, res) => {
    console.log(req.body);
    Firma_Produkcyjna.create({
        Nazwa: req.body.Nazwa,
        Siedziba: req.body.Siedziba
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating producent.",
            });
        });
});


exports = module.exports = route