import React, { useState, useEffect } from 'react'
import styles from './MatchCompanyFilm.module.css'
import axios from 'axios'

export default function MatchCompanyFilm(props) {
    const [Nazwa, setName] = useState("");
    const [Companies, setCompanies] = useState()
    const [Film_Id, setFilm_Id] = useState(0)

    useEffect(() => {
        setFilm_Id(props.Id)
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Firma_Produkcyjna`,
        };

        axios(configuration)
            .then((res) => {
                var CompaniesAxios = ''
                for (var i = 0; i < res.data.length; i++) {
                    CompaniesAxios = CompaniesAxios + ' ' + res.data[i].Nazwa
                }
                setCompanies(CompaniesAxios)
            })
    }, [])

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
                        props.handler()
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
                    <label htmlFor="title" class="form-label"  >Company name</label>
                    <input type="text" class="form-control" name="Kategoria_Id" onChange={(e) => setName(e.target.value)} />
                    <p>Avaiable companies</p>
                    <p style={{ fontSize: "12px" }}>{Companies}</p>
                    <button className={styles.Button2} onSubmit={(e) => handleSubmit(e)}>Assign</button>
                </form>
            </div>
        </div>
    )
}