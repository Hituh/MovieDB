import React, { useState } from 'react'
import axios from 'axios'
import styles from './EditPassword.module.css'

export default function EditPassword() {
    const [Hasło, setHasło] = useState("");
    const [PotwierdźHasło, setPotwierdźHasło] = useState("");
    var dane = JSON.parse(localStorage.getItem('userInfo'));
    var Login = dane.Login
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Uzytkownik/user/updatePassword",
            data: {
                Login,
                Hasło,
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
                <h3>Change password</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">
                        <label for="title" class="form-label">New password</label>
                        <input type="password" class="form-control" onChange={(e) => setHasło(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Confirm password</label>
                        <input type="password" class="form-control" onChange={(e) => setPotwierdźHasło(e.target.value)} />
                    </div>
                    {Hasło === PotwierdźHasło && (Hasło !== "") ?
                        <div>
                            <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Change</button>
                        </div> :
                        <div>
                            <p>Passwords do not match or both fields are empty</p>
                        </div>
                    }
                </form>
            </div>
        </div>
    )



}