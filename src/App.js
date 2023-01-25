import './App.css';
import Login from './components/Login/Login.jsx'
import Profile from './components/Profile/Profile'
import React, { useState } from 'react';
import Actors from './components/Actors/Actors';
import Movies from './components/Films/Films';
import s from "./components/FilmDetails/FilmDetails.module.css"

function App() {
  const [films, setFilm] = useState(true);
  const [actors, setActors] = useState(false);
  const [profile, setProfile] = useState(false);
  const [login, setLogin] = useState(false);

  var check = false
  if (localStorage.getItem("userInfo") !== null) {
    check = true
  }

  const toggleFilms = () => {
    setFilm(true);
    setActors(false);
    setProfile(false)
    setLogin(false)
  }
  const toggleActors = () => {
    setActors(true);
    setFilm(false);
    setProfile(false)
    
    setLogin(false)
  }
  const toggleProfile = () => {
    setActors(false);
    setFilm(false);
    setProfile(true);
    setLogin(false)
  }
  const toggleLogin = () => {
    setFilm(false);
    setActors(false);
    setProfile(false)
    setLogin(true)
  }
  const toggleLogout = () => {
    setFilm(true);
    setActors(false);
    setProfile(false)
  }

  return (
    <div class="App">
      <div className={s.parentApp}>
        <div className={s.divApp1}>
          <button className={s.button} onClick={toggleFilms}>Movie list</button></div>
        <div className={s.divApp2}>
          <button className={s.button} onClick={toggleActors}>Actors list</button></div>
        <div className={s.divApp3}>
        <button className={s.button} onClick={toggleProfile}>My Profile</button></div>

      </div >
      {films && <Movies />}
      {actors && <Actors />}
      {profile && <Profile />}
    </div>
  )

}

export default App;
