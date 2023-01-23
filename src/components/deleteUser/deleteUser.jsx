import React, { Component, useState, useEffect } from 'react'
import styles from './deleteUser.module.css'
import axios from 'axios'


function DeleteUser() {
    const [Nazwa, setNazwa] = useState("");
    const [Companies, setCompanies] = useState()
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Uzytkownik`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for(var i = 0; i < res.data.length; i++) {
                kategorie = kategorie + ' ' + res.data[i].Login
            }
            setCompanies(kategorie)
        });
    }, [])

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Uzytkownik/delete",
            data: {
                Login : Nazwa
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
                <h2>Podaj usuwanego użytkownika</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">
                        <label for="title" class="form-label">Login użytkownika</label>
                        <input type="login" class="form-control" name="Login" onChange={(e) => setNazwa(e.target.value)} />
                    </div>
                    <p>Lista Użytkowników</p>
                    <p style={{ fontSize: "12px" }}>{Companies}</p>
                
                    <div>
                        <button className={styles.Button2} onClick={(e) => handleSubmit(e)} >Usuń</button>
                    </div>
                </form>
            </div>
        </div>
    )



}
export default DeleteUser;