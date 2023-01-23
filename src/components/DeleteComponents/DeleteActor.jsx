import React from 'react'
import axios from 'axios'
import styles from './DeleteActor.module.css'
export default function DeleteActor (props) {
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Osoba/delete",
            data: {
                Osoba_Id : props.Id
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
                    <h2>Czy na pewno?</h2>
                        <button className={styles.Button2} type="submit"  onClick={(e) => handleSubmit(e)}>Tak</button>
                </div>
            </div>
        )
}