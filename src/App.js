import './App.css';
import Profile from './components/Profile/Profile'
import React, { useState } from 'react';
import Actors from './components/Actors/Actors';
import Movies from './components/Films/Films';
import s from "./components/FilmDetails/FilmDetails.module.css"

function App() {
  const [films, setFilm] = useState(true);
  const [actors, setActors] = useState(false);
  const [profile, setProfile] = useState(false);

  var userCheck = false
  if (localStorage.getItem("userInfo") !== null) {
    userCheck = true
  }

  const toggleFilms = () => {
    setFilm(true);
    setActors(false);
    setProfile(false)
  }
  const toggleActors = () => {
    setActors(true);
    setFilm(false);
    setProfile(false)
  }
  const toggleProfile = () => {
    setActors(false);
    setFilm(false);
    setProfile(true);
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
