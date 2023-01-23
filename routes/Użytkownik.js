const db = require("../models");
const route = require('express').Router()
var Użytkownik = db.Użytkownik
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

route.get('/', (req, res) => {
    Użytkownik.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
})

route.get('/:id', (req, res) => {
    const id = req.params.id;

    Użytkownik.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
})

route.post("/delete", (req, res) => {
    console.log(req.body);
    Użytkownik.destroy({
    where: {Login: req.body.Login},cascade:true})
        .then((data) => {
            res.send("Super");
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting user.",
            });
        });
});

route.post("/user/updatePassword", (request, response) => {
    // hash the password
    psw = request.body.Hasło
    bcrypt
        .hash(psw, 10, function(err, hashedPassword)
        {
            Użytkownik
                .update({
                    Hasło: hashedPassword},
                    { where: {Login: request.body.Login}}
                )
                // return success if the new user is added to the database successfully
                .then((result) => {
                    response.status(201).send({
                        message: "Password updated successfully",
                        result,
                    });
                })
                // catch erroe if the new user wasn't added successfully to the database
                .catch((error) => {
                    response.status(500).send({
                        message: "Error updating password",
                        error,
                    });
                });
        }
        
)});

route.post("/user/update", (request, response) => {
    // hash the password
    psw = request.body.Hasło
    bcrypt
        .hash(psw, 10, function(err, hashedPassword)
        {
            Użytkownik
                .update({
                    Login: request.body.Login,
                    EMail: request.body.EMail,
                    Hasło: hashedPassword,
                    StatusPremium: request.body.StatusPremium,
                    TypKonta: request.body.TypKonta,
                    Zdjęcie: request.body.Zdjęcie}
                    ,{ where: {Login: request.body.Login}}
                )
                // return success if the new user is added to the database successfully
                .then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully",
                        result,
                    });
                })
                // catch erroe if the new user wasn't added successfully to the database
                .catch((error) => {
                    response.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
        }
        
)});


route.post("/user/register", (request, response) => {
    // hash the password
    psw = request.body.Hasło
    bcrypt
        .hash(psw, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const user = new Użytkownik({
                Login: request.body.Login,
                EMail: request.body.EMail,
                Hasło: hashedPassword,
                StatusPremium: false,
                TypKonta: "Użytkownik",
                Zdjęcie: request.body.Zdjęcie
            });

            // save the new user
            user
                .save()
                // return success if the new user is added to the database successfully
                .then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully",
                        result,
                    });
                })
                // catch erroe if the new user wasn't added successfully to the database
                .catch((error) => {
                    response.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
        })
        //   catch error if the password hash isn't successful
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
});

route.post("/user/login", (request, response) => {
    // check if email exists
    console.log(request.body.Login)
    console.log(request.body.Hasło)
    login = request.body.Login
    pwd = request.body.Hasło
    Użytkownik.findOne({
        where: {
            Login: login
        }
    })
        // if email exists
        .then((user) => {
            var pwdcheck = bcrypt.compareSync(pwd, user.Hasło)
            console.log(pwdcheck)
            if (pwdcheck == true) {
                console.log("Works")
                const token = jwt.sign(
                            {
                                userLogin: user.Login,
                                userEmail: user.EMail,
                            },
                            "RANDOM-TOKEN",
                            { expiresIn: "24h" }
                        )
                response.status(200).send({
                    message: "Login Successful",
                    Login: user.Login,
                    token
                })
            }

            else {
                response.status(401).send({
                    message: "Passwords do not match",
                });
            }

        })
        // catch error if email does not exist
        .catch((e) => {
            response.status(404).send({
                message: "Login not found",
                e,
            });
        });
})

route.post("/update", (req, res) => {
    const Login = req.body.Login;
    Użytkownik.update({
        StatusPremium : req.body.StatusPremium,
    },
    {where:{Login : Login}})
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with Login=${Login}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + Login
        });
      });
})

exports = module.exports = route

