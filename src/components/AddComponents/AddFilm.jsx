import React, { useState } from 'react'
import axios from "axios"
import styles from './AddFilm.module.css'

export default function AddFilm() {
    const [Tytuł, setTitle] = useState("");
    const [Data_Wydania, setReleaseDate] = useState("");
    const [Język, setLanguage] = useState("");
    const [Długość, setLength] = useState("");
    const [Opis, setDescription] = useState("");
    const [Zdjęcie, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Film",
            data: {
                Tytuł,
                Data_Wydania,
                Język,
                Długość,
                Opis,
                Zdjęcie
            },
        };
        axios(configuration)
            .then(() => {
                window.location.reload(false);
            })
            .catch((error) => {
                error = new Error();
            });
    }
    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <h2>New film</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="title" class="label">Title</label>
                    <input type="textarea" class="form-control" placeholder="Eg. The Witcher" name="Tytuł" onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="title" class="form-label">Release date</label>
                    <input type="RRRR-MM-DD" class="form-control" placeholder="Eg. 2022-09-30" name="DataWydania" onChange={(e) => setReleaseDate(e.target.value)} />
                    <label htmlFor="title" class="form-label">Language</label>
                    <input type="text" class="form-control" placeholder="Eg. English" name="Język" onChange={(e) => setLanguage(e.target.value)} />
                    <label htmlFor="title" class="form-label">Length</label>
                    <input type="number" class="form-control" placeholder="Amount in minutes" name="Długość" onChange={(e) => setLength(e.target.value)} />
                    <label htmlFor="title" class="form-label">Description</label>
                    <input type="text" class="form-control" name="Opis" onChange={(e) => setDescription(e.target.value)} />
                    <label htmlFor="title" class="form-label">Picture</label>
                    <input type="text" class="form-control" name="Zdjecie" onChange={(e) => setImage(e.target.value)} />
                    <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Add film</button>
                </form>
            </div>
        </div>
    )
}