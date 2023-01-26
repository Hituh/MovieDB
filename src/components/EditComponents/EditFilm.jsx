import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './EditFilm.module.css'

export default function EditFilm(props) {
    const [Film_Id, setId] = useState("");
    const [Tytuł, setTytuł] = useState("");
    const [Data_Wydania, setData] = useState("");
    const [Język, setJęzyk] = useState("");
    const [Długość, setDługość] = useState("");
    const [Opis, setOpis] = useState("");
    const [Zdjęcie, setZdjęcie] = useState("");
    const [parsed, setParsed] = useState("");

    useEffect(() => {
        if (parsed === "") {
            setParsed("parsed")
            setId(props.props.Id)
            setTytuł(props.props.Title)
            setData(props.props.ReleaseDate)
            setJęzyk(props.props.Language)
            setDługość(props.props.Length)
            setOpis(props.props.Description)
            setZdjęcie(props.props.Picture)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Film/update",
            data: {
                Film_Id,
                Tytuł,
                Data_Wydania,
                Długość,
                Opis,
                Zdjęcie,
                Język
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
                <h1>Edit film</h1>
                <from onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="title" class="form-label" >Title</label>
                    <input type="text" class="form-control" name="Tytuł" value={Tytuł} onChange={(e) => setTytuł(e.target.value)} />
                    <label htmlFor="title" class="form-label" >Release date</label>
                    <input type="text" class="form-control" name="Tytuł" value={Data_Wydania} onChange={(e) => setData(e.target.value)} />
                    <label htmlFor="title" class="form-label" >Languag</label>
                    <input type="text" class="form-control" name="Tytuł" value={Język} onChange={(e) => setJęzyk(e.target.value)} />
                    <label htmlFor="title" class="form-label" >Length</label>
                    <input type="text" class="form-control" name="Tytuł" value={Długość} onChange={(e) => setDługość(e.target.value)} />
                    <label htmlFor="title" class="form-label" >Description</label>
                    <input type="text" class="form-control" name="Tytuł" value={Opis} onChange={(e) => setOpis(e.target.value)} />
                    <label htmlFor="title" class="form-label" >Picture</label>
                    <input type="text" class="form-control" name="Tytuł" value={Zdjęcie} onChange={(e) => setZdjęcie(e.target.value)} />
                    <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Edit</button>

                </from>
            </div>
        </div>
    )
}