import React, { useState, useEffect } from "react";
import './navbar.css';
import { Link } from 'react-router-dom';


function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedIn"))
        console.log(loggedIn)
    }, [localStorage.getItem("loggedIn")])



    return (
        <div className="navbar">
            <ul className="menu">
                <Link to="/">
                    <li className="menuItems" href="/">Accueil</li>
                </Link>
                <Link to="/signup">
                    <li className="menuItems" href="/">S'inscrire</li>
                </Link>                
                <Link to="/login">
                    <li className="menuItems" href="/">Se connecter</li>
                </Link>
            </ul>
        </div>
    )


}

export default Navbar;