import React, { useEffect, useState } from "react";
import './css/navbar.css';
import { useSelector } from 'react-redux';
// import { useHistory } from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import { logOut } from '../redux/actions/userActions'
import { useDispatch } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import jwt from "jsonwebtoken";

function UserLogged() {


    const useStyles = makeStyles({
        menuItems: {
            color: 'white',
            cursor: 'pointer'
        },
        linkItems: {
            padding: "0",
            textDecoration: "none"
        }

    })

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    // const loggedInGuest = useSelector((state) => state.loggedInGuest.user)
    const logout = useSelector((state) => state.logout.user)
    const dispatch = useDispatch();
    console.log(loggedInUser)
    let history = useHistory();

    function Logout() {

        localStorage.clear();
        history.push("/login")
        dispatch(logOut(logout))
    }

    const current_time = Date.now() / 1000;
    if (jwt.exp < current_time) {
        localStorage.clear();
        // history.push("/login")
        dispatch(logOut(logout))
    }

    let id = loggedInUser.data.userId

    const classes = useStyles();

    return (
        <>
            <Grid className={classes.grid} columnSpacing={{ xs: 3, sm: 2, md: 3 }} sx={{ display: 'flex', columnGap: 3, alignItems:'center' }}>
                <Link className={classes.linkItems} to="/">
                    <Grid item className={classes.menuItems}>Accueil</Grid>
                </Link>
                <Link className={classes.linkItems}  to="/upload">
                    <Grid item className={classes.menuItems}>Publier</Grid>
                </Link>
                <Link className={classes.linkItems} to={`/profile/${id}`}>
                    <Grid item className={classes.menuItems}>{loggedInUser.data.userInfo[0] + " " + loggedInUser.data.userInfo[1]}</Grid>
                </Link>
                {/* <Link className={classes.linkItems} to="/login"> */}
                    <Grid item className={classes.menuItems} onClick={Logout}><LogoutRoundedIcon /></Grid>
                {/* </Link> */}
            </Grid>

        </>
    )
}
function Guest() {
    return (
        <>

            <Link to="/signup">
                <li className="menuItems">S'enregistrer</li>
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

