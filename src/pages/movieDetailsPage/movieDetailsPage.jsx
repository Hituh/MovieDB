import React, { useState, useEffect } from 'react'

import AddComment from '../../components/AddComponents/AddComment';
import FollowButton from '../../components/FollowButton/FollowButton';
import CommentList from '../../components/Comments/Comments'

import MatchActorFilm from "../../components/MatchComponents/MatchActorFilm"
import MatchCategoryFilm from "../../components/MatchComponents/MatchCategoryFilm"
import MatchCompanyFilm from '../../components/MatchComponents/MatchCompanyFilm'

import DeleteFilm from "../../components/DeleteComponents/DeleteFilm"
import ChangeFilm from "../../components/EditComponents/EditFilm"
import ActorListDetails from '../../components/FilmActorsList/FilmActorsList';

import styles from "./movieDetailsPage.module.css"
import axios from 'axios'

const DetailsFilm = () => {
    const [props, setProps] = useState("");
    const [isShown1, setIsShown1] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const [isShown3, setIsShown3] = useState(false);
    const [isShown4, setIsShown4] = useState(false);
    const [isShown5, setIsShown5] = useState(false);
    const [isShown6, setIsShown6] = useState(false);
    const [categories, setCategories] = useState();
    const [companies, setCompanies] = useState();

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var check = false
    var check2 = false
    var checkLogged = false
    if (userInfo !== null) checkLogged = true
    if (checkLogged && (userInfo.TypKonta === 'Moderator' || userInfo.TypKonta === 'Administrator')) check = true
    if (checkLogged) check2 = true

    useEffect(() => {

        const options = {
            url: 'https://www.omdbapi.com/?t=Witcher&apikey=fc1fef96'
          };
          console.log("Testing public api")
          axios(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });

        var retrievedObject = localStorage.getItem('filmTitle');
        setProps(JSON.parse(retrievedObject))

        const test = JSON.parse(retrievedObject);
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Film/findCategories/${test.Id}`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for (var i = 0; i < res.data.Kategoria_Id_Kategoria.length; i++) {
                kategorie = kategorie + " " + res.data.Kategoria_Id_Kategoria[i]["Nazwa"]
            }
            setCategories(kategorie)
        });

        const configuration2 = {
            method: "get",
            url: `http://localhost:8080/routes/Film/findCompanies/${test.Id}`,
        };

        axios(configuration2).then((res) => {
            var firmy = ''
            if (res.data.Firma_Id_Firma_Produkcyjnas != null)
                for (var i = 0; i < res.data.Firma_Id_Firma_Produkcyjnas.length; i++) {
                    firmy = firmy + " " + res.data.Firma_Id_Firma_Produkcyjnas[i]["Nazwa"]
                }
            setCompanies(firmy)
        });
    }, [])


    const handleAdd1 = () => {
        setIsShown1(current => !current);
    }
    const handleAdd2 = () => {
        setIsShown2(current => !current);
    }
    const handleAdd3 = () => {
        setIsShown3(current => !current);
    }
    const handleAdd4 = () => {
        setIsShown4(current => !current);
    }
    const handleAdd5 = () => {
        setIsShown5(current => !current);
    }
    const handleAdd6 = () => {
        setIsShown6(current => !current);
    }

    return (
        <div class="main1" style={{ marginTop: "2vh" }}>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col" style={{ maxWidth: "fit-content" }}>
                            <img src={props.Picture} style={{ height: "450px" }} alt=""></img>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col" style={{ minWidth: "80vh" , maxWidth:"80vh"}}>
                                    <div className="col" style={{ fontSize: "50px" }}>
                                        {props.Title}
                                    </div>
                                    <h3 >Język: {props.Language}</h3>
                                    <p style={{ paddingTop: "2vh" }}>Kategorie:
                                        {categories === '' && (
                                            <div>Nie dodano jeszcze kategorii do tego tytułu</div>
                                        )}{categories} </p>
                                    <p style={{ paddingTop: "2vh" }}>Firmy Produkcyjne:
                                        {companies === '' && (
                                            <div>Nie dodano jeszcze firm produkcyjnych do tego tytułu</div>
                                        )}{companies} </p>
                                    <p style={{ paddingTop: "2vh" }}>Data wydania : {props.ReleaseDate}</p>
                                    <div className="row" style={{ paddingTop: "2vh" }}>
                                        <div style={{ maxWidth: "1100px" }}>
                                            Opis: {props.Description}
                                        </div>
                                    </div>
                                </div>

                                <div className="col" style={{ paddingLeft: "3vh", minWidth: "30vh" , maxWidth:"30vh" }}>
                                    {check2 &&
                                        <div className="col" style={{ paddingTop: "1vh" }}><FollowButton />
                                        </div>}
                                    <div className="col">
                                        <ActorListDetails />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                </div>
                {check === true &&
                    <div style={{ marginTop: "1vh" }}>
                        <button className={styles.addButton} onClick={() => handleAdd1()}>Dodaj Osobę</button>
                        {isShown1 &&
                            <div>
                                <MatchActorFilm ></MatchActorFilm>
                            </div>
                        }

                        <button className={styles.addButton} onClick={() => handleAdd2()}>Dodaj Kategorię</button>
                        {isShown2 &&
                            <div>
                                <MatchCategoryFilm></MatchCategoryFilm>
                            </div>
                        }
                        <button className={styles.addButton} onClick={() => handleAdd5()}>Dodaj wytwórnię</button>
                        {isShown5 &&
                            <div>
                                <MatchCompanyFilm />
                            </div>
                        }
                        <button className={styles.addButton} onClick={() => handleAdd4()}>Edytuj Film</button>
                        {isShown4 &&
                            <div>
                                <ChangeFilm />
                            </div>
                        }
                        <button className={styles.addButton} onClick={() => handleAdd3()}>Usuń film</button>
                        {isShown3 &&
                            <div>
                                <DeleteFilm
                                Id={props.Id} ></DeleteFilm>
                            </div>
                        }
                    </div>
                }
                <div className="row" style={{ paddingTop: "10vh" }}>

                    <div className="col" >
                        <CommentList />
                    </div>
                </div>
                {check2 && <button className={styles.addButton} onClick={() => handleAdd6()}>Dodaj komentarz</button>}

                {isShown6 &&
                    <div className="row" style={{ paddingTop: "50px" }}>
                        <AddComment />
                    </div>}

            </div>
        </div>
    )
}
export default DetailsFilm