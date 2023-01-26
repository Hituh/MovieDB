import React, { useState, useEffect } from "react";
import axios from 'axios'
import AddFilmButton from "../AddComponents/AddFilmButton";
import Film from "../Film/Film";
import styles from "./Films.module.css";

export default function Films() {
    const [films, setFilms] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:8080/routes/Film",
        };
        axios(configuration)
            .then((res) => {
                setFilms(res.data)
            })
            .catch((error) => {
                error = new Error();
            });
    })

    return (
        <div>
            <div className={styles.form_container}>
                <h3 style={{ maxWidth: "30vh", marginRight: "0px" }}>Search for title</h3>
                <input type="text" className={styles.form_input} value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Title name"></input>
            </div>
            {(filter === '') &&
                <div className={styles.card_list}>
                    {films.map((data) => (
                        <Film
                            Id={data.Film_Id}
                            Title={data.Tytuł}
                            ReleaseDate={data.Data_Wydania}
                            Language={data.Język}
                            Length={data.Długość}
                            Description={data.Opis}
                            Picture={data.Zdjęcie} />
                    ))}
                </div>
            }
            {(filter !== '') &&
                <div className={styles.card_list}>
                    {films.map((data) => (
                        <div>
                            {(data.Tytuł.includes(filter)) &&
                                <Film
                                    Id={data.Film_Id}
                                    Title={data.Tytuł}
                                    ReleaseDate={data.Data_Wydania}
                                    Language={data.Język}
                                    Length={data.Długość}
                                    Description={data.Opis}
                                    Picture={data.Zdjęcie} />
                            }
                        </div>
                    ))}
                </div>
            }
            <AddFilmButton />
        </div>
    );
}

