import React, { useEffect, useState } from "react";
import './css/navbar.css';
import { useSelector } from 'react-redux';
// import { useHistory } from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import { logoutReducer } from '../redux/reducers/userReducer'
import {logOut} from './../redux/actions/userActions'
import { useDispatch } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import jwt from "jsonwebtoken";
import {Box, Button} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

// MenuItems à afficher lorsque l'utilisateur est connecté
function UserLogged() {

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    let id = loggedInUser && loggedInUser.user.data ? loggedInUser.user.data.userId : null;
    // const logout = useSelector((state) => state.logout.isLoggedIn)
    const dispatch = useDispatch();
    let history = useHistory();

    const useStyles = makeStyles({
        menuItems: {
            textDecoration: 'none',
            cursor: 'pointer'
        },
        linkItems: {
            padding: "0",
            color: 'black',
            textDecoration: "none"
        }

    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    // Déconnexion
    function Logout() {

        localStorage.clear();
        history.push("/login")
        dispatch(logOut())
    }


    const classes = useStyles();

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem className={classes.menuItems} onClick={handleClose}>
                    <Link className={classes.linkItems} to="/">
                        Accueil
                    </Link>
                </MenuItem>
                <MenuItem className={classes.menuItems} onClick={handleClose}>
                    <Link className={classes.linkItems} to="/upload">
                        Publier
                    </Link>
                </MenuItem>
                <MenuItem className={classes.menuItems} onClick={handleClose}>
                    <Link className={classes.linkItems} to={`/profile/${id}`}>
                        {loggedInUser && loggedInUser.user.data && loggedInUser.user.data.userInfo[0] + " " + loggedInUser.user.data.userInfo[1]}
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Box item className={classes.menuItems} onClick={Logout}><LogoutRoundedIcon /></Box>
                </MenuItem>
            </Menu>
        </div>
    );

    // Déconnexion automatique (token invalide)
    // const current_time = Date.now() / 1000;
    // if (jwt.exp < current_time) {
    //     localStorage.clear();
    //     // history.push("/login")
    //     dispatch(logoutReducer(logout))
    // }
}

// MenuItems à afficher lorsque l'utilisateur n'est pas connecté
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

// Gestion des deux MenuItems
export default function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInUser = useSelector((state) => state.loggedInUser.user)

    useEffect(() => {

        if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
            setLoggedIn(false)
        }
        else {
            setLoggedIn(true)
        }
    }, [loggedInUser])

    return (
        <div className="navbar">

            <Link to="/" className="link">
                <img tabindex="0" className="groupomania" src="../assets/icon-left-font-monochrome-white.png" alt="Groupomania"/>
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
