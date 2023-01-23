import React, { useState, useEffect } from 'react'
import styles from './MatchCompanyFilm.module.css'
import axios from 'axios'

export default function MatchCompanyFilm() {
    const [Nazwa, setName] = useState("");
    const [Companies, setCompanies] = useState()
    var filmInfo = JSON.parse(localStorage.getItem('filmTitle'));
    var Film_Id = filmInfo.Id;

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Firma_Produkcyjna`,
        };

        axios(configuration)
            .then((res) => {
                var kategorie = ''
                for (var i = 0; i < res.data.length; i++) {
                    kategorie = kategorie + ' ' + res.data[i].Nazwa
                }
                setCompanies(kategorie)})
                
    }
, [])

const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
        method: "post",
        url: "http://localhost:8080/routes/Firma_Produkcyjna/findId",
        data: {
            Nazwa,
        },
    };
    axios(configuration)
        .then(function (response) {
            var Firma_Id = response.data.Firma_Id
            var configuration2 = {
                method: "post",
                url: "http://localhost:8080/routes/Film_Firma",
                data: {
                    Firma_Id,
                    Film_Id

                },
            };
            axios(configuration2)
                .then(() => {
                })
                .catch(function (error) {
                    
                });
        })
        .catch(function (error) {
            
        });
}
return (
    <div className={styles.cont}>
        <div className={styles.form_container}>
            <h2>Assign company to this film</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-3">
                    <label for="title" class="form-label"  >Company name</label>
                    <input type="text" class="form-control" name="Kategoria_Id" onChange={(e) => setName(e.target.value)} />
                </div>
                <p>Avaiable companies</p>
                <p style={{ fontSize: "12px" }}>{Companies}</p>

                <div>
                    <button className={styles.Button2} onSubmit={(e) => handleSubmit(e)}>Assign</button>
                </div>
            </form>
        </div>
    </div>
)
}