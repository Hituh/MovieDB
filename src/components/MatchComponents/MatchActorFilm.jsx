import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './MatchActorFilm.module.css'

export default function MatchActorFilm(props) {
    const [Imię, setName] = useState("");
    const [Nazwisko, setSurname] = useState("");
    const [Stanowisko, setJob] = useState("");
    const [error, setError] = useState("");
    const [added, setAdded] = useState(false);
    const [Film_Id, setFilm_Id] = useState(0)
    const [type, setType] = useState("");

    useEffect(() => {
        setFilm_Id(props.Id)
    }, [])

    const getId = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Osoba/findId",
            data: {
                Imię,
                Nazwisko
            },
        };
        axios(configuration)
            .then(function (response) {
                console.log(response.data.Osoba_Id);
                localStorage.setItem('Osoba_Id', JSON.stringify(response.data.Osoba_Id))
            })
            .catch(function (error) {
                setError(error.response.data.message);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getId()
        var Osoba_Id = 0
        setTimeout(Osoba_Id = JSON.parse(localStorage.getItem('Osoba_Id')), 1500);
        var configuration
        if (type === 'Pracownik') {
            configuration = {
                method: "post",
                url: "http://localhost:8080/routes/Film_Pracownik",
                data: {
                    Film_Id,
                    Osoba_Id,
                    Stanowisko,
                },
            };
        }
        if (type === "Aktor") {
            var Rola = Stanowisko;
            configuration = {
                method: "post",
                url: "http://localhost:8080/routes/Film_Aktor",
                data: {
                    Film_Id,
                    Osoba_Id,
                    Rola,
                },
            };
        }
        // set configurations
        axios(configuration)
            .then(() => {
                setAdded(true)
                props.handler()
            })
            .catch(function (error) {
                setError(error.response.data.message);
            });
    }

    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <h2>Assign actor to this film</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" name="Imie" onChange={(e) => setName(e.target.value)} />
                    <label class="form-label">Surname</label>
                    <input type="text" class="form-control" name="Nazwisko" onChange={(e) => setSurname(e.target.value)} />
                    <label class="form-label">Role</label>
                    <input type="text" class="form-control" name="Stanowisko" onChange={(e) => setJob(e.target.value)} />
                    {added && <p>Succesfully assigned actor to this film</p>}
                    {error !== "" && <p style={{ color: "#F48FB1" }}>{error}</p>}
                    <button className={styles.Button2} onClick={() => (setType('Aktor'))} onSubmit={(e) => handleSubmit(e)}>Add actor</button>
                </form>
            </div>
        </div>
    )
}