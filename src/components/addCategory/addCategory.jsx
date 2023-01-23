import React, { useState, useEffect } from 'react'
import axios from "axios"
import styles from './addCategory.module.css'

function AddCategory() {
    const [Nazwa, setNazwa] = useState("");
    const [Categories, setCategories] = useState()
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Kategoria`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for(var i = 0; i < res.data.length; i++) {
                kategorie = kategorie + ' ' + res.data[i].Nazwa
            }
            setCategories(kategorie)
        });
    }, [])

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
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
            })
            .catch((error) => {
                error = new Error();

            });
    }
    return (
        <div className = {styles.cont}>
            <div className={styles.form_container}>
                <h2>Nowa kategoria</h2>
                <from onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">
                        <label for="title" class="form-label">Nazwa</label>
                        <input type="text" class="form-control" name="Imie" onChange={(e) => setNazwa(e.target.value)} />
                    </div>
                    <p>Dostępne kategorie</p>
                    <p style={{fontSize: "12px"}}>{Categories}</p>  
                    {added ? (
                        <p className="text-success">Category added succesfully</p>
                    ) : (
                        <></>
                    )}
                    <div class="mb-3">
                        <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Dodaj Kategorie</button>
                    </div>
                </from>

            </div>
        </div>
    )

}
export default AddCategory;