import React, { useState, useEffect } from 'react'
import axios from "axios"
import styles from './AddCategory.module.css'

export default function AddCategory() {
    const [Nazwa, setNazwa] = useState("");
    const [Categories, setCategories] = useState()
    const [added, setAdded] = useState(false);

    const getCategories = () => {
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
        });
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Kategoria",
            data: {
                Nazwa
            },
        };
        axios(configuration)
            .then(() => {
                setAdded(true)
                getCategories()
            })
            .catch((error) => {
                error = new Error();
            });
    }
    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <h2>New category</h2>
                <from onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">
                        <label htmlFor="title" class="form-label">Name</label>
                        <input type="text" class="form-control" name="Imie" onChange={(e) => setNazwa(e.target.value)} />
                    </div>
                    <p>Avaiable categories</p>
                    <p style={{ fontSize: "12px" }}>{Categories}</p>
                    <div class="mb-3">
                        <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Add category</button>
                    </div>
                </from>
            </div>
        </div>
    )
}