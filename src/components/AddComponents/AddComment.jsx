import React, { useState } from 'react'
import axios from 'axios'
import styles from './AddComment.module.css'
export default function AddComment(props) {
    const [Komentarz, setKomentarz] = useState("");
    const [Ocena, setOcena] = useState("");
    const [Film_Id] = useState(props.Id)

    var dane = JSON.parse(localStorage.getItem('userInfo'));
    var Login = dane.Login
    const handleSubmit = (e) => {
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Opinia",
            data: {
                Film_Id,
                Login,
                Komentarz,
                Ocena
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
                <h2>New comment</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="title" class="form-label" >Comment content</label>
                    <input type="textarea" class="form-control" name="Komentarz" onChange={(e) => setKomentarz(e.target.value)} />
                    <label htmlFor="title" class="form-label" >Rating</label>
                    <input type="number" min="0" max="5" class="form-control" name="Komentarz" style={{ maxWidth: "10vh" }} onChange={(e) => setOcena(e.target.value)} />
                    <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Add comment</button>
                </form>
            </div>
        </div>
    )   
}