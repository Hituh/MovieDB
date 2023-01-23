import React, { Component } from "react";
import AddActorButton from "../AddComponents/AddActorButton";
import Actor from "../Actor/Actor";
import styles from "./Actors.module.css";


export default class Actors extends Component {
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
                    <h3 style={{ maxWidth: "35vh", marginRight: "0px" }}>Search actor</h3>
                    <input type="text" className={styles.form_input} value={this.state.term} onChange={this.onInputChange} placeholder="Enter name"></input>
                    <button className={styles.Button2}>Search!</button>
                </div>
                {(this.state.term === '') &&
                    <div className={styles.card_list}>
                        {this.state.films.map((data) => (
                            <div>
                                <Actor
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
}