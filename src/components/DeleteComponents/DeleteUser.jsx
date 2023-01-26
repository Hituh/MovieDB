import React, { useState, useEffect } from 'react'
import styles from './DeleteUser.module.css'
import axios from 'axios'

export default function DeleteUser() {
    const [Nazwa, setNazwa] = useState("");
    const [Companies, setCompanies] = useState()

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Uzytkownik`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for (var i = 0; i < res.data.length; i++) {
                kategorie = kategorie + ' ' + res.data[i].Login
            }
            setCompanies(kategorie)
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Uzytkownik/delete",
            data: {
                Login: Nazwa
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
                <h2>Enter the user to be banned</h2>
                <form >
                    <label htmlFor="title" class="form-label">Login</label>
                    <input type="login" class="form-control" name="Login" onChange={(e) => setNazwa(e.target.value)} />
                    <p>List of users</p>
                    <p style={{ fontSize: "12px" }}>{Companies}</p>
                    <button className={styles.Button2} onClick={(e) => handleSubmit(e)} >Ban</button>
                </form>
            </div>
        </div>
    )



}