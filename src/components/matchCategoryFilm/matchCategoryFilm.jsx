import React, { Component, useState, useEffect } from 'react'
import styles from './matchCategoryFilm.module.css'
import axios from 'axios'

function MatchCategoryFilm() {
    const [Nazwa, setName] = useState("");
    const [Categories, setCategories] = useState()

    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");
    var filmInfo = JSON.parse(localStorage.getItem('filmTitle'));
    var Film_Id = filmInfo.Id;

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Kategoria`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for (var i = 0; i < res.data.length; i++) {
                kategorie = kategorie + ' ' + res.data[i].Nazwa
            }
            setCategories(kategorie)
        }).catch(function (error) {
            setError(error.response.data.message);
        });;
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Kategoria/findId",
            data: {
                Nazwa,
            },
        };
        console.log(configuration);
        axios(configuration)
            .then(function (response) {
                console.log("response")
                console.log(response);
                var Kategoria_Id = response.data.Kategoria_Id
                console.log("Resp data " + response.data.Kategoria_Id)
                var configuration2 = {
                    method: "post",
                    url: "http://localhost:8080/routes/Film_Kategoria",
                    data: {
                        Kategoria_Id,
                        Film_Id

                    },
                };
                console.log(configuration2);
                axios(configuration2)
                    .then(() => {
                    })
                    .catch(function (error) {
                        setError(error.response.data.message);
                    });
            })
            .catch(function (error) {
                setError(error.response.data.message);
            });
    }
    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <h2>Przypisz kategorię do filmu</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">  
                        <label for="title" class="form-label"  >Nazwa Kategorii</label>
                        <input type="text" class="form-control" name="Kategoria_Id" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <p>Dostępne kategorie</p>
                    <p style={{ fontSize: "12px" }}>{Categories}</p>
                    {added &&
                        <p>Pomyślnie dodano kategorię do filmu</p>}
                    {error !== "" &&
                        <p style={{ color: "#F48FB1" }}>{error}</p>}
                    <div>
                        <button className={styles.Button2} onSubmit={(e) => handleSubmit(e)}>Dodaj</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MatchCategoryFilm;