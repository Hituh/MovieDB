import React, { useState, useEffect } from 'react'
import styles from './EditUser.module.css'
import axios from 'axios'

export default function EditUser (){
    const [Login, setLogin] = useState("");
    const [EMail, setEmail] = useState("");
    const [Hasło, setHasło] = useState("");
    const [StatusPremium, setStatusPremium] = useState("");
    const [TypKonta, setTypKonta] = useState("");
    const [Zdjęcie, setZdjęcie] = useState("");
    const [Users, setUsers] = useState()

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Uzytkownik`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for(var i = 0; i < res.data.length; i++) {
                kategorie = kategorie + ' ' + res.data[i].Login
            }
            setUsers(kategorie)
        });
    }, [])


    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        var lstorage = {
            Login,
                StatusPremium,
                TypKonta,
                Zdjęcie
        }
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Uzytkownik/user/update",
            data: {
                Login,
                EMail,
                Hasło,
                StatusPremium,
                TypKonta,
                Zdjęcie
            },
        };
        axios(configuration)
            .then(() => {
                window.localStorage.removeItem('userInfo')
                localStorage.setItem("userInfo", JSON.stringify(lstorage));
                window.location.reload(false);
            })
            .catch((error) => {
                error = new Error();

            });
    }


        return(
            <div className = {styles.cont}>
            <div className={styles.form_container}>
                    <h3>Edit user</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-3">
                    <label for="title" class="form-label" >Login</label>
                    <input type="text" class="form-control" onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >E-Mail</label>
                    <input type="text" class="form-control" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Password</label>
                    <input type="text" class="form-control" onChange={(e) => setHasło(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Premium status</label>
                    <input type="text" class="form-control" onChange={(e) => setStatusPremium(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Account type</label>
                    <input type="text" class="form-control" onChange={(e) => setTypKonta(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label" >Picture</label>
                    <input type="text" class="form-control" onChange={(e) => setZdjęcie(e.target.value)}/>
                </div>
                <p>Users list</p>
                    <p style={{ fontSize: "12px" }}>{Users}</p>
                <div>
                <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Edit</button>
                </div>
            </form>
            </div>
            </div>
        )
        
    

}