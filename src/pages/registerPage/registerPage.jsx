import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from './registerPage.module.css'

export default function Register() {
    // initial state
    const [EMail, setEmail] = useState("");
    const [Hasło, setPassword] = useState("");
    const [PowtórzHasło, setConfirmPassword] = useState("");
    const [Login, setLogin] = useState("");
    const [Zdjęcie, setImage] = useState("");
    const [register, setRegister] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Uzytkownik/user/register",
            data: {
                Login,
                EMail,
                Hasło,
                Zdjęcie
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                setRegister(true);

            })
            .catch(function (error)  {
                setError(error.response.data.message);
            });
    };
    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <div className="row">
                    <div className="col-md-7">
                        <h1>Rejestracja</h1>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} action="http://localhost:3000/movies">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                            <input type="email" class="form-control" name="EMail" placeholder="Your_Name@mail.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label">Login</label>
                            <input type="login" class="form-control" name="Login" placeholder="Nazwa_Użytkownika" onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label">Hasło</label>
                            <input type="password" class="form-control" name="Hasło" placeholder="***********" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label">Powtórz Hasło</label>
                            <input type="password" class="form-control" name="Hasło" placeholder="***********" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput4" class="form-label">Link do zdjęcia</label>
                            <input type="text" class="form-control" name="Zdjęcie" placeholder="https://paczaizm.pl/content/geralt.jpg" onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Zarejestruj</button>
                            {register ? (
                        <p className="text-success" style={{color: "white"}}>You Are Registered Successfully</p>
                    ) : (
                        <p></p>
                    )}

{error !== "" &&
                    <p style={{color:"#F48FB1"}}>{error}</p>}
                        </div>
                        <div>
                            <label for="btnSuccess" class="form-label">Masz już konto?</label>
                            
                        </div>
                        <div>
                        <Link className="link" to="/login" style={{ textDecoration: "none" }}>Logowanie</Link>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}