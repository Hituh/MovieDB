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
            {check === true &&
                <div className="header">
                    <Link className="link" to="/" style={{ textDecoration: "none", marginLeft: "1rem" }}>MovieDB</Link>
                    <Link className="link" to="movies" style={{ textDecoration: "none", marginLeft: "1rem" }}>Film list</Link>
                    <Link className="link" to="persons" style={{ textDecoration: "none" }}>Actors list</Link>
                    <Link className="link" to="profile" style={{ textDecoration: "none" }}>My profile</Link>
                    <h6 className="link" style={{ textDecoration: "none", marginRight: "1rem", }} onClick={(e) => logout(e)}>Logout</h6>
                </div>}
            {check === false &&
                <div className="header"><Link className="link" to="/" style={{ textDecoration: "none", marginLeft: "1rem" }}>MovieDB</Link>
                    <Link className="link" to="movies" style={{ textDecoration: "none", marginLeft: "1rem" }}>Film list</Link>
                    <Link className="link" to="persons" style={{ textDecoration: "none" }}>Actors list</Link>
                    <Link className="link" to="login" style={{ textDecoration: "none", marginRight: "1rem" }}>Login/Register</Link></div>}
        </div>
    )
}
export default Header