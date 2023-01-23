import React, { useState } from 'react'
import axios from "axios"
import styles from "./AddActor.module.css"

export default function AddActor (){
    const [Imię, setName] = useState("");
    const [Nazwisko, setSurname] = useState("");
    const [Data_Urodzenia, setDate] = useState("");
    const [Kraj_Pochodzenia, setCountry] = useState("");
    const [Zdjęcie, setImage] = useState("");

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Osoba",
            data: {
                Imię,
                Nazwisko,
                Data_Urodzenia,
                Kraj_Pochodzenia,
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
        return(
            <div className = {styles.cont}>
            <div className={styles.form_container}>
                    <h2>Nowa osoba</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-3">
                    <label for="title" class="form-label">Imię</label>
                    <input type="text" class="form-control" name="Imie" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Nazwisko</label>
                    <input type="text" class="form-control" name="Nazwisko" onChange={(e) => setSurname(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Data Urodzenia</label>
                    <input type="RRRR-MM-DD" class="form-control" placeholder="RRRR-MM-DD" name="Data_urodzenia" onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Kraj Pochodzenia</label>
                    <input type="text" class="form-control" name="Kraj_Pochodzenia" onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Zdjęcie</label>
                    <input type="text" class="form-control" name="Zdjecie" onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div class="mb-3">
                        <button className="btn btn-success" type="submit" onClick={(e) => handleSubmit(e)}>Dodaj Osobe</button>
                    </div>
            </form>
            
            </div>
            </div>
        )
    
}