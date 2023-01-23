import React, { Component } from "react";
import AddActorButton from "../addActorButton/addActorButton";
import ActorItem from "../actorItem/actorItem";
import styles from "./actorList.module.css";


class ActorList extends Component {
    constructor() {
        super();
        this.state = {
            films: [],
            term: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/routes/Osoba')
            .then(res => res.json())
            .then(films => this.setState({ films }, () => console.log('Films fetched', films)))
    }

    onInputChange = (e) => {
        this.setState({ term: e.target.value })
    }

    render() {
        return (
            <div>
                <div className={styles.form_container}>
                    <h3 style={{ maxWidth: "35vh", marginRight: "0px" }}>Wyszukaj osobę</h3>
                    <input type="text" className={styles.form_input} value={this.state.term} onChange={this.onInputChange} placeholder="Wpisz Imię"></input>
                    <button className={styles.Button2}>Szukaj!</button>
                </div>
                {(this.state.term === '') &&
                    <div className={styles.card_list}>
                        {this.state.films.map((data) => (
                            <div>
                                <ActorItem
                                    Id={data.Osoba_Id}
                                    Name={data.Imię}
                                    Surname={data.Nazwisko}
                                    Birthday={data.Data_Urodzenia}
                                    Country={data.Kraj_Pochodzenia}
                                    Picture={data.Zdjęcie} />
                            </div>
                        ))}
                    </div>
                }
                {(this.state.term !== '') &&
                    <div className={styles.card_list}>
                        {this.state.films.map((data) => (
                            <div>
                                {(data.Imię.includes(this.state.term)) &&
                                    <ActorItem
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
}
export default ActorList;
