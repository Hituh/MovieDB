import React, { Component } from "react";
import AddFilmButton from "../addFilmButton/addFilmButton";
import FilmItem from "../filmItem/filmItem";
import styles from "./filmList.module.css";

class FilmList extends Component {
    constructor() {
        super();
        this.state = {
            films: [],
            term: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/routes/Film')
            .then(res => res.json())
            .then(films => this.setState({ films }, () => console.log('Films fetched', films)))
            .catch((error) => {
                error = new Error();

            });
        console.log(this.state.films)
    }


    onInputChange = (e) => {
        this.setState({ term: e.target.value })
    }


    render() {
        return (
            <div>
                <div className={styles.form_container}>
                    <h3 style={{ maxWidth: "30vh", marginRight: "0px" }}>Wyszukaj tytuł</h3>
                    <input type="text" className={styles.form_input} value={this.state.term} onChange={this.onInputChange} placeholder="Wpisz nazwę tytułu"></input>
                    <button className={styles.Button2} onClick={this.onTermSubmit}>Szukaj!</button>
                </div>

                {(this.state.term === '') &&
                    <div className={styles.card_list}>
                        {this.state.films.map((data) => (                            
                                <div>
                                    <FilmItem
                                        Id={data.Film_Id}
                                        Title={data.Tytuł}
                                        ReleaseDate={data.Data_Wydania}
                                        Language={data.Język}
                                        Length={data.Długość}
                                        Description={data.Opis}
                                        Picture={data.Zdjęcie} />
                                </div>
                        ))}
                    </div>
                }
                {(this.state.term !== '') &&
                    <div className={styles.card_list}>
                        {this.state.films.map((data) => (
                            <>
                                {(data.Tytuł.includes(this.state.term)) &&
                                    <div>
                                        <FilmItem
                                            Id={data.Film_Id}
                                            Title={data.Tytuł}
                                            ReleaseDate={data.Data_Wydania}
                                            Language={data.Język}
                                            Length={data.Długość}
                                            Description={data.Opis}
                                            Picture={data.Zdjęcie} />
                                    </div>
                                }
                            </>
                        ))}
                    </div>
                }
                <AddFilmButton />
            </div>
        );
    }
}
export default FilmList;
