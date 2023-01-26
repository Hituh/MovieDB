import React, { useState, useEffect } from "react"
import s from "./Profile.module.css"
import axios from "axios"
import DeleteUser from "../DeleteComponents/DeleteUser"
import ChangePassword from "../EditComponents/EditPassword"
import AddCompany from "../AddComponents/AddCompany.jsx"
import AddCategory from "../AddComponents/AddCategory"
import EditUser from "../EditComponents/EditUser"


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
    const [isShownChangePwd, setShownChangePwd] = useState(false);
    const [isShownDelete, setShownDelete] = useState(false);
    const [isShownAddComp, setShownAddComp] = useState(false);
    const [isShownAddCat, setShownAddCat] = useState(false);
    const [isShownEditUser, setShownEditUser] = useState(false);
    const handleDelete = () => { setShownDelete(current => !current); }
    const handleChangePwd = () => { setShownChangePwd(current => !current); }
    const handleAddCat = () => { setShownAddCat(current => !current); }
    const handleAddComp = () => { setShownAddComp(current => !current); }
    const handleEditUser = () => { setShownEditUser(current => !current); }

    return (
        <div>
            <div className={s.parent}>
                <div className={s.div1} style={{ maxWidth: "fit-content" }}>
                    <img src={dane.Zdjęcie} alt={"Profile pic"} style={{ height: "60vh" }} />
                </div>
                <div className={s.div2}>
                    <h1>Hello {dane.Login}!</h1>
                    {dane.StatusPremium ? (
                        <h6 class="premium">Premium</h6>
                    ) : (
                        <div style={{ marginBottom: "0.6rem" }}>
                            <h6 class="premium">No premium</h6>
                            <button className={s.addButton} onClick={(e) => handleSubmit(e)}>Buy premium now!</button>
                        </div>
                    )}
                    <h6 class="premium">{dane.TypKonta}</h6>
                    {observed.length === 0 && (<div>You are not following any titles yet</div>)}
                    {observed.length !== 0 && (
                        <div>Followed titles:
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
                <div className={s.div3}>
                    <button className={s.addButton} onClick={() => handleChangePwd()}>Change password</button>
                    {check === true &&
                        <div>
                            <button className={s.addButton} onClick={() => handleDelete()}>Ban user</button>
                            <button className={s.addButton} onClick={() => handleEditUser()}>Edit user</button>
                            <button className={s.addButton} onClick={() => handleAddComp()}>Add company</button>
                            <button className={s.addButton} onClick={() => handleAddCat()}>Add category</button>
                        </div>
                    }
                </div>
            </div>
            {check === true && <div>
                {isShownChangePwd && <ChangePassword />}
                {isShownDelete && <DeleteUser />}
                {isShownEditUser && <EditUser />}
                {isShownAddComp && <AddCompany />}
                {isShownAddCat && <AddCategory />}
            </div>}
        </div>
    );
}


