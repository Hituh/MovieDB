import React, { useState, useEffect } from "react";
import AddActorButton from "../AddComponents/AddActorButton";
import Actor from "../Actor/Actor";
import axios from 'axios'
import styles from "./Actors.module.css";

export default function Actors() {
    const [actors, setActors] = useState([])
    const [filter, setFilter] = useState("")
    const [fetched, setFetched] = useState(false)

    const fetchActors = () => {
        if(!fetched){
            const configuration = {
                method: "get",
                url: "http://localhost:8080/routes/Osoba",
            };
            axios(configuration)
                .then((res) => {
                    setActors(res.data)
                })
                .catch((error) => {
                    error = new Error();
                });
                setFetched(true)
        }
    }

    useEffect(() => {
        fetchActors()
    })

    return (
        <div>
            <div className={styles.form_container}>
                <h3 style={{ maxWidth: "35vh", marginRight: "0px" }}>Search actor</h3>
                <input type="text" className={styles.form_input} value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Enter name"></input>
            </div>
            {(filter === '') &&
                <div className={styles.card_list}>
                    {actors.map((data) => (
                        <Actor
                            Id={data.Osoba_Id}
                            Name={data.Imię}
                            Surname={data.Nazwisko}
                            Birthday={data.Data_Urodzenia}
                            Country={data.Kraj_Pochodzenia}
                            Picture={data.Zdjęcie} />
                    ))}
                </div>
            }
            {(filter !== '') &&
                <div className={styles.card_list}>
                    {actors.map((data) => (
                        <div>
                            {(data.Imię.includes(filter)) &&
                                <Actor
                                    Id={data.Osoba_Id}
                                    Name={data.Imię}
                                    Surname={data.Nazwisko}
                                    Birthday={data.Data_Urodzenia}
                                    Country={data.Kraj_Pochodzenia}
                                    Picture={data.Zdjęcie} />
                            }
                        </div>
                    ))}
                </div>
            }
            <AddActorButton />
        </div>
    );
}