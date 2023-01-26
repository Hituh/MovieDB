import React, { useState, useEffect } from 'react'
import styles from './MatchCategoryFilm.module.css'
import axios from 'axios'

export default function MatchCategoryFilm(props) {
    const [Nazwa, setName] = useState("");
    const [Categories, setCategories] = useState()
    const [Film_Id] = useState(props.Id)

    const [error, setError] = useState("");
    const getCategories = () => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Kategoria`,
        };

        axios(configuration).then((res) => {
            var CategoriesAxios = ''
            for (var i = 0; i < res.data.length; i++) {
                CategoriesAxios = CategoriesAxios + ' ' + res.data[i].Nazwa
            }
            setCategories(CategoriesAxios)
        }).catch(function (error) {
            setError(error.response.data.message);
        });;
    }

    useEffect(() => {
        getCategories()
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
        axios(configuration)
            .then(function (response) {
                var Kategoria_Id = response.data.Kategoria_Id
                var configuration2 = {
                    method: "post",
                    url: "http://localhost:8080/routes/Film_Kategoria",
                    data: {
                        Kategoria_Id,
                        Film_Id
                    },
                };
                axios(configuration2)
                    .then(() => {
                        props.handler()
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
                <h2>Assign category to this film</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="title" class="form-label"  >Category name</label>
                    <input type="text" class="form-control" name="Kategoria_Id" onChange={(e) => setName(e.target.value)} />
                    <p>Avaiable categories</p>
                    <p style={{ fontSize: "12px" }}>{Categories}</p>
                    {error !== "" && <p style={{ color: "#F48FB1" }}>{error}</p>}
                    <button className={styles.Button2} onSubmit={(e) => handleSubmit(e)}>Assign</button>
                </form>
            </div>
        </div>
    )
}