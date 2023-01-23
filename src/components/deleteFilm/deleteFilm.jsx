import React, { Component} from 'react'
import axios from 'axios'
import styles from './deleteFilm.module.css'
function DeleteFilm (props) {

    
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Film/delete",
            data: {
                Film_Id : props.Id
            },
        };
        axios(configuration)
            .then(() => {
                setTimeout(() => { window.location.href = "/movies" }, 1500);
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
export default DeleteFilm;