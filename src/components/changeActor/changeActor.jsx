import React, { Component, useEffect, useState } from 'react'
import styles from './changeActor.module.css'
import axios from 'axios'

function ChangeActor (props) {
    const [Osoba_Id, setId] = useState("");
    const [Imię, setImię] = useState("");
    const [Nazwisko, setNazwisko] = useState("");
    const [Data_Urodzenia, setData] = useState("");
    const [Kraj_Pochodzenia, setKraj] = useState("");
    const [Zdjęcie, setZdjęcie] = useState("");
    const [parsed, setParsed] = useState("");

    useEffect(() => {
        if(parsed === "") {
            setParsed("parsed")
            setId(props.Id)
            setImię(props.Name)
            setNazwisko(props.Surname)
            setData(props.Birthday)
            setKraj(props.Country)
            setZdjęcie(props.Picture)}
    })

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Osoba/update",
            data: {
                Osoba_Id,
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
                    <h2>Zmień dane aktora</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-3">
                    <label for="title" class="form-label" >Imię aktora</label>
                    <input type="text" class="form-control" name="Imie" value={Imię} onChange={(e) => setImię(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Nazwisko aktora</label>
                    <input type="text" class="form-control" name="Nazwisko" value={Nazwisko} onChange={(e) => setNazwisko(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Data Urodzenia</label>
                    <input type="RRRR-MM-DD" class="form-control" name="Nazwisko" value={Data_Urodzenia} onChange={(e) => setData(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Kraj Pochodzenia</label>
                    <input type="text" class="form-control" name="Nazwisko" value={Kraj_Pochodzenia} onChange={(e) => setKraj(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Zdjęcie</label>
                    <input type="text" class="form-control" name="Zdjęcie" value={Zdjęcie} onChange={(e) => setZdjęcie(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Zmień</button>
                </div>
            </form>
            </div>
            </div>
        )
        
    }
export default ChangeActor;