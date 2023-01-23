import React, { useState } from 'react'
import axios from "axios"
import styles from './addFilmItem.module.css'

export default function AddFilmItem() {
    const [Tytuł, setTitle] = useState("");
    const [Data_Wydania, setReleaseDate] = useState("");
    const [Język, setLanguage] = useState("");
    const [Długość, setLength] = useState("");
    const [Opis, setDescription] = useState("");
    const [Zdjęcie, setImage] = useState("");
    const [added, setAdded] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
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
        <div className = {styles.cont}>
            <div className={styles.form_container}>
                <h2>Nowy Film</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">
                        <label for="title" class="label">Tytuł</label>
                        <input type="textarea" class="form-control" name="Tytuł" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Data Wydania</label>
                        <input type="RRRR-MM-DD" class="form-control" placeholder="RRRR-MM-DD" name="DataWydania" onChange={(e) => setReleaseDate(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Język</label>
                        <input type="text" class="form-control" name="Język" onChange={(e) => setLanguage(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Długość</label>
                        <input type="number" class="form-control" placeholder="Minuty"name="Długość" onChange={(e) => setLength(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Opis</label>
                        <input type="text" class="form-control" name="Opis" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Zdjęcie</label>
                        <input type="text" class="form-control" name="Zdjecie" onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Dodaj Film</button>
                    </div>
                </form>
                {added ? (
                    <p className={styles.text_success}>Pomyślnie dodano film</p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )



}
