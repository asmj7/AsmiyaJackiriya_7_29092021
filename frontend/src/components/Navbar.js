import React, { useEffect, useState } from "react";
import './css/navbar.css';
import { useSelector } from 'react-redux';
// import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { logOut } from '../redux/actions/userActions'
import { useDispatch } from 'react-redux';
import ListItemButton from '@mui/material/ListItemButton';
import LogoutIcon from '@mui/icons-material/Logout';

function UserLogged() {
    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    // const loggedInGuest = useSelector((state) => state.loggedInGuest.user)
    const logout = useSelector((state) => state.logout.user)
    const dispatch = useDispatch();
    console.log(loggedInUser)
    // let history = useHistory();

    function Logout() {

        localStorage.clear();
        // history.push("/login")
        dispatch(logOut(logout))
    }
    let id = loggedInUser.data.userId
    console.log(id)

    return (
        <>
            <Link to="/">
                <li className="menuItems">Accueil</li>
            </Link>
            <Link to="/upload">
                <li className="menuItems">Publier</li>
            </Link>
            <Link to={`/profile/${id}`}>
                <li className="menuItems">{loggedInUser.data.userInfo[0] + " " + loggedInUser.data.userInfo[1]}</li>
            </Link>
            <Link to="/login">
                <ListItemButton className="menuItems" onClick={Logout}>{<LogoutIcon />}</ListItemButton>
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
    // const loggedInGuest = useSelector((state) => state.loggedInGuest.user)
    // console.log(loggedInUser)

    useEffect(() => {

        if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
            setLoggedIn(false)
        }
        else {
            setLoggedIn(true)
        }
    }, [loggedInUser])

    // useEffect(() => {

    //     if (!loggedInGuest || Object.keys(loggedInGuest).length === 0) {
    //         setLoggedIn(false)
    //     }
    //     else {
    //         setLoggedIn(true)
    //     }
    // }, [loggedInGuest])

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

