const db = require("../models");
const route = require('express').Router()
var Kategoria = db.Kategoria

route.get('/', (req, res) => {
    Kategoria.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving categories."
          });
      });
})  

route.post('/findId', (req, res) => {
    Kategoria.findOne({
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
                  err.message || "Some error occurred while retrieving category."
          });
      });
}) 

route.post('/', (req, res) => {
    console.log(req.body)
    Kategoria.create({
        Nazwa: req.body.Nazwa,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating category."
            });
        });
})
exports = module.exports = route