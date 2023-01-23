import React, { Component } from 'react'
import axios from 'axios'
import styles from './deleteActor.module.css'
function DeleteActor (props) {
    console.log(props)

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
export default DeleteActor;