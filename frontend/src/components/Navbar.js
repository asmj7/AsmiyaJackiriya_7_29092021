import React from "react";
import './navbar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';

function UserLogged() {
    return (
        <>
                <Link to="/">
                    <li className="menuItems">Accueil</li>
                </Link>
                <Link to="/upload">
                    <li className="menuItems">Publier</li>
                </Link>
                <Link to="/profile">
                    <li className="menuItems">Profile</li>
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

function Navbar() {
    const loggedIn = localStorage.getItem("loggedIn")
    // const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     setLoggedIn(localStorage.getItem("loggedIn"))
    // }, [localStorage.getItem("loggedIn")])

    // let loggedIn = localStorage.getItem("loggedIn")
    return (
        <div className="navbar">
            <BrowserRouter>
                <Link to="/" className="link">
                    <h1 className="groupomania">Groupomania.</h1>
                </Link>
                <ul className="menu">
                    {/* {!loggedIn ? (
                    <Link to="/profile">
                        <li className="menuItems" href="/">Profile</li>
                    </Link>
                ) : (
                    <>
                        <Link to="/login">
                            <li className="menuItems" href="/">S'inscrire</li>
                        </Link>
                        <Link to="/login">
                            <li className="menuItems" href="/">Se connecter</li>
                        </Link>
                    </>
                )} */}
                    {loggedIn ? (
                        <UserLogged />
                    ) : (
                        <Guest />
                    )}
                </ul>
            </BrowserRouter>
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