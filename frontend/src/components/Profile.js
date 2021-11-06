import React from "react";
import Axios from 'axios';
import { useParams } from "react-router";
import './navbar.css'


function Profile() {
    let { id } = useParams();
    const url = 'http://localhost:3000/api/auth/'
    Axios.get(url + id)
        .then((response) => {
            console.log(response)
        })

    return (
        <h1 className="profile">Profile</h1>
    )
}

export default Profile;