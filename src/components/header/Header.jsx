import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
    var check = false
    if (localStorage.getItem("userInfo") !== null) {
        check = true
    }
    const logout = () => {
        window.localStorage.removeItem('userInfo')
        setTimeout(() => { window.location.href = "/" }, 1000);
    }
    return (
        <div>
            {check == true &&
                <div className="header">
                    <Link className="link" to="/" style={{ textDecoration: "none", marginLeft: "1rem" }}>MovieDB</Link>
                    <Link className="link" to="movies" style={{ textDecoration: "none", marginLeft: "1rem" }}>Lista Filmów</Link>
                    <Link className="link" to="persons" style={{ textDecoration: "none" }}>Lista Osób</Link>
                    <Link className="link" to="profile" style={{ textDecoration: "none" }}>Mój Profil</Link>
                    <h7 className="link" style={{ textDecoration: "none", marginRight: "1rem", }} onClick={(e) => logout(e)}>Wyloguj</h7>
                </div>}
            {check == false &&
                <div className="header"><Link className="link" to="/" style={{ textDecoration: "none", marginLeft: "1rem" }}>MovieDB</Link>
                    <Link className="link" to="movies" style={{ textDecoration: "none", marginLeft: "1rem" }}>Lista Filmów</Link>
                    <Link className="link" to="persons" style={{ textDecoration: "none" }}>Lista Osób</Link>
                    <Link className="link" to="login" style={{ textDecoration: "none", marginRight: "1rem" }}>Logowanie</Link></div>}
        </div>
    )
}
export default Header