import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/homePage/homePage'
import MoviesPage from './pages/moviesPage/moviesPage'
import PersonsPage from './pages/personsPage/personsPage.jsx'
import Register from './pages/registerPage/registerPage.jsx'
import Login from './pages/loginPage/loginPage.jsx'
import Profile from './pages/myProfilPage/myProfilPage.jsx'
import DetailsFilm from './pages/movieDetailsPage/movieDetailsPage'
import React from 'react';

function App() {  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movies" element={<MoviesPage />}/>
          <Route path="persons" element={<PersonsPage/>}/>
          <Route path="login/register" element={<Register />}/>
          <Route path="login" element={<Login />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="/filmDetails" element={<DetailsFilm />}/>
          <Route path="/*" element={<h2>Bad route</h2>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
