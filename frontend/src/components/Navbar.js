import React, { useEffect, useState } from "react";
import './navbar.css';
import ReactDOM from 'react-dom';

import { BrowserRouter, Link } from 'react-router-dom';

function UserLogged() {
    return (
        <>
            
                <Link to="api/post/">
                    <li className="menuItems">Accueil</li>
                </Link>
                <Link to="api/post/upload">
                    <li className="menuItems">Publier</li>
                </Link>
                <Link to="api/post/profile">
                    <li className="menuItems">Profile</li>
                </Link>
            
        </>
    )
}
function Guest() {
    return (
        <>
            
                <Link to="api/auth/signup">
                    <li className="menuItems">S'inscrire</li>
                </Link>
                <Link to="api/auth/login">
                    <li className="menuItems">Se connecter</li>
                </Link>

        </>
    )

}

function Navbar() {
    // const logged = localStorage.getItem("loggedIn")
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedIn"))
    }, [localStorage.getItem("loggedIn")])

    // let loggedIn = localStorage.getItem("loggedIn")
    return (
        <div className="navbar">
            
                <Link to="api/post/" className="link">
                    <h1 className="groupomania">Groupomania.</h1>
                </Link>
                <ul className="menu">
                    {loggedIn ? (
                        <UserLogged />
                    ) : (
                        <Guest />
                    )}
                </ul>
            
        </div>
    )

}

ReactDOM.render(
    <BrowserRouter>
        <Navbar loggedIn={false} />
    </BrowserRouter>,
    document.getElementById('root')
);

export default Navbar;