import React, { useEffect, useState } from "react";
import './navbar.css';
import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function UserLogged() {
    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    return (
        <>
            <Link to="/Home">
                <li className="menuItems">Accueil</li>
            </Link>
            <Link to="/upload">
                <li className="menuItems">Publier</li>
            </Link>
            <Link to="/profile">
                <li className="menuItems">{loggedInUser.data.userInfo[0]+ " " + loggedInUser.data.userInfo[1]}</li>
            </Link>

        </>
    )
}
function Guest() {
    return (
        <>

            <Link to="/signup">
                <li className="menuItems">S'inscrire</li>
            </Link>
            <Link to="/login">
                <li className="menuItems">Se connecter</li>
            </Link>

        </>
    )

}

export default function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    // console.log(loggedInUser)

    useEffect(() => {

        if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
            setLoggedIn(false)
        }
        else {
            setLoggedIn(true)
        }
    }, [loggedInUser])

    console.log(loggedInUser)
    console.log(loggedIn)

    return (
        <div className="navbar">

            <Link to="/" className="link">
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

// ReactDOM.render(
//     <BrowserRouter>
//         <Navbar />
//     </BrowserRouter>,
//     document.getElementById('root')
// );

// export default Navbar;

