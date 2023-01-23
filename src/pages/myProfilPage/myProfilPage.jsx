import React, { useState, useEffect } from "react"
import styles from "./myProfilPage.module.css"
import axios from "axios"
import DeleteUser from "../../components/DeleteComponents/DeleteUser"
import ChangePassword from "../../components/EditComponents/EditPassword"
import AddCompany from "../../components/AddComponents/AddCompany.jsx"
import AddCategory from "../../components/AddComponents/AddCategory"
import EditUser from "../../components/EditComponents/EditUser"


export default function Profile() {

    const [observed, setObserved] = useState([]);
    var dane = JSON.parse(localStorage.getItem('userInfo'));

    var check = false
    if (dane !== null && (dane.TypKonta === 'Moderator' || dane.TypKonta === 'Administrator')) check = true
    else check = false

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Obserwuje/findObserved/${dane.Login}`,
        };

        axios(configuration).then((res) => {
            var kategorie = []
            for (var i = 0; i < res.data.length; i++) {
                var name = res.data[i].Film["Tytuł"]
                kategorie.push(name);
            }
            setObserved(kategorie)
        });
    }, [])
    const handleSubmit = (e) => {
        axios
            .post('http://localhost:8080/routes/Uzytkownik/update', {
                Login: dane.Login,
                StatusPremium: true
            })
            .then(function (response) {
            })

        window.localStorage.removeItem('userInfo')
        dane.StatusPremium = true
        localStorage.setItem('userInfo', JSON.stringify(dane));
        window.location.reload(false);
    }
    const [isShownChangePwd, setIsShown2] = useState(false);
    const [isShownDelete, setIsShown1] = useState(false);
    const [isShownAddComp, setIsShown3] = useState(false);
    const [isShownAddCat, setIsShown5] = useState(false);
    const [isShownEditUser, setIsShown4] = useState(false);
    const handleDelete = () => {
        setIsShown1(current => !current);
    }
    const handleChangePwd = () => {
        setIsShown2(current => !current);
    }
    const handleAddCat = () => {
        setIsShown5(current => !current);
    }
    const handleAddComp = () => {
        setIsShown3(current => !current);
    }
    const handleEditUser = () => {
        setIsShown4(current => !current);
    }

    return (
        <div>
            <div class="main">
                <div className="container emp-profile" style={{ marginTop: "5vh", marginBottom: "2vh" }}>
                    <div className="row">
                        <div className="col" style={{ maxWidth: "fit-content" }}>
                            <img src={dane.Zdjęcie} alt={"Profile pic"} style={{ height: "450px" }}>
                            </img>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <div className="col" style={{ fontSize: "50px" }}>Witaj {dane.Login}!</div>
                                {dane.StatusPremium ? (
                                    <h6 class="premium">Premium</h6>
                                ) : (
                                    <div style={{ marginBottom: "0.6rem" }}>
                                        <h6 class="premium">Brak Premium</h6>
                                        <button className={styles.addButton} onClick={(e) => handleSubmit(e)}>Zakup premium</button>
                                    </div>
                                )}
                                <h6 class="premium">{dane.TypKonta}</h6>

                                <div>
                                    {observed.length === 0 && (
                                        <div>Nie obserwujesz jeszcze żadnych tytułów</div>
                                    )}
                                    {observed.length !== 0 && (
                                        <div>Obserwowane filmy:
                                            <ul>
                                                {observed.map((item) => (
                                                    <li key={item}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "1vh" }}>
                        <button className={styles.addButton} onClick={() => handleChangePwd()}>Zmień hasło</button>
                        {isShownChangePwd &&
                            <div>
                                <ChangePassword></ChangePassword>
                            </div>

                        }

                        {check === true &&
                            <>
                                <button className={styles.addButton} onClick={() => handleDelete()}>Zbanuj Użytkownika</button>
                                {isShownDelete &&
                                    <div>
                                        <DeleteUser ></DeleteUser>
                                    </div>
                                }
                                <button className={styles.addButton} onClick={() => handleAddComp()}>Dodaj Firme</button>
                                {isShownAddComp &&
                                    <div>
                                        <AddCompany></AddCompany>
                                    </div>
                                }
                                <button className={styles.addButton} onClick={() => handleAddCat()}>Dodaj Kategorię</button>
                                {isShownAddCat &&
                                    <div>
                                        <AddCategory></AddCategory>
                                    </div>
                                }
                                <button className={styles.addButton} onClick={() => handleEditUser()}>Edytuj Użytkownika</button>
                                {isShownEditUser &&
                                    <div>
                                        <EditUser />
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}


