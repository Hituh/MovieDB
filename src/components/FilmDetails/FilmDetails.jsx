import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'
import s from "./FilmDetails.module.css";

import AddComment from '../../components/AddComponents/AddComment';
import FollowButton from '../../components/FollowButton/FollowButton';
import Comments from '../../components/Comments/Comments'

import MatchActorFilm from "../../components/MatchComponents/MatchActorFilm"
import MatchCategoryFilm from "../../components/MatchComponents/MatchCategoryFilm"
import MatchCompanyFilm from '../../components/MatchComponents/MatchCompanyFilm'

import DeleteFilm from "../../components/DeleteComponents/DeleteFilm"
import EditFilm from "../../components/EditComponents/EditFilm"
import ActorListDetails from '../../components/FilmActorsList/FilmActorsList';

export default function FilmDetails(props) {
    const [showMatchActorFilm, setMatchActorFilm] = useState(false);
    const [showMatchCategoryFilm, setMatchCategoryFilm] = useState(false);
    const [showMatchCompanyFilm, setMatchCompanyFilm] = useState(false);
    const [showChangeFilm, setChangeFilm] = useState(false);
    const [showDeleteFilm, setDeleteFilm] = useState(false);
    const [showAddComment, setAddComment] = useState(false);
    const [plot, setPlot] = useState("")
    const [director, setDirector] = useState("")
    const [rated, setRated] = useState("")
    const [isMovieFound, setMovieFound] = useState("true")
    const [errorType, setErrorType] = useState("")
    const [categories, setCategories] = useState();
    const [companies, setCompanies] = useState();

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var checkPerms = false
    var check2 = false
    var checkLogged = false
    if (userInfo !== null) checkLogged = true
    if (checkLogged && (userInfo.TypKonta === 'Moderator' || userInfo.TypKonta === 'Administrator')) checkPerms = true
    if (checkLogged) check2 = true

    const updateState = () => {
        getCompanies()
        getCategories()
    }

    const getCategories = () => {
        const categoriesConfig = {
            method: "get",
            url: `http://localhost:8080/routes/Film/findCategories/${props.Id}`,
        };

        axios(categoriesConfig).then((res) => {
            var kategorie = ''
            for (var i = 0; i < res.data.Kategoria_Id_Kategoria.length; i++) {
                kategorie = kategorie + " " + res.data.Kategoria_Id_Kategoria[i]["Nazwa"]
            }
            setCategories(kategorie)
        });
    }

    const getCompanies = () => {
        const companiesConfig = {
            method: "get",
            url: `http://localhost:8080/routes/Film/findCompanies/${props.Id}`,
        };

        axios(companiesConfig).then((res) => {
            var firmy = ''
            if (res.data.Firma_Id_Firma_Produkcyjnas != null)
                for (var i = 0; i < res.data.Firma_Id_Firma_Produkcyjnas.length; i++) {
                    firmy = firmy + " " + res.data.Firma_Id_Firma_Produkcyjnas[i]["Nazwa"]
                }
            setCompanies(firmy)
        });
    }

    useEffect(() => {
        //Public API call
        const publicAPIConfig = {
            url: `https://www.omdbapi.com/?t=${props.Title}&apikey=fc1fef96`
        };
        axios(publicAPIConfig).then(function (response) {
            console.log(response.data)
            setPlot(response.data.Plot)
            setDirector(response.data.Director)
            setRated(response.data.Rated)
            setMovieFound(response.data.Response)
            setErrorType(response.data.Error)

        }).catch(function (error) {
        });
        getCategories()
        getCompanies()
    }, [])

    const toggleMatchActorFilm = () => { setMatchActorFilm(current => !current); }
    const toggleMatchCategoryFilm = () => { setMatchCategoryFilm(current => !current); }
    const toggleMatchCompanyFilm = () => { setMatchCompanyFilm(current => !current); }
    const toggleChangeFilm = () => { setChangeFilm(current => !current); }
    const toggleDeleteFilm = () => { setDeleteFilm(current => !current); }
    const toggleAddComment = () => { setAddComment(current => !current); }

    return (
        <div className={s.card}>
            <button className={s.button} onClick={props.onClose}>Go back</button>
            <div className={s.parent}>
                <div className={s.div1}>
                    <img src={props.Picture} alt=""></img>
                </div>
                <div className={s.div2}>
                    {check2 && <FollowButton Id={props.Id} Title={props.Title} />}
                </div>
                <div className={s.div3}>
                    <h1>{props.Title}</h1>
                    <p>Language: {props.Language}</p>
                    {isMovieFound === "True" && <p>Director: {director}</p>}
                    {isMovieFound === "True" && <p>Rated: {rated}</p>}
                    <p>Categories:
                        {categories === '' && (
                            <div>There are no categories assigned yet</div>
                        )}{categories} </p>
                    <p>Companies:
                        {companies === '' && (
                            <div>There are no companies assigned yet</div>
                        )}{companies} </p>
                    <p>Release date : {props.ReleaseDate}</p>
                    <ActorListDetails Id={props.Id} />
                    {isMovieFound === "True" && <h3>Description: {plot}</h3>}
                    {isMovieFound === "False" && <div><h3>Failed to fetch additional data from API: </h3>
                        <p>{errorType}</p></div>}
                </div>
            </div>

            {checkPerms === true &&
                <div style={{ marginTop: "1vh" }}>
                    <button className={s.addButton} onClick={() => toggleMatchActorFilm()}>Assign actor</button>
                    {showMatchActorFilm && <MatchActorFilm handler={updateState} Id={props.Id} />}
                    <button className={s.addButton} onClick={() => toggleMatchCategoryFilm()}>Assign category</button>
                    {showMatchCategoryFilm && <MatchCategoryFilm handler={updateState} Id={props.Id} />}
                    <button className={s.addButton} onClick={() => toggleMatchCompanyFilm()}>Assign company</button>
                    {showMatchCompanyFilm && <MatchCompanyFilm handler={updateState} Id={props.Id} />}
                    <button className={s.addButton} onClick={() => toggleChangeFilm()}>Edit film</button>
                    {showChangeFilm && <EditFilm props={props} />}
                    <button className={s.addButton} onClick={() => toggleDeleteFilm()}>Delete film</button>
                    {showDeleteFilm && <DeleteFilm Id={props.Id} />}
                </div>
            }
            <Comments Id={props.Id} />
            {check2 && <button className={s.addButton} onClick={() => toggleAddComment()}>Add comment</button>}

            {showAddComment && <AddComment Id={props.Id} />}
        </div>)
}