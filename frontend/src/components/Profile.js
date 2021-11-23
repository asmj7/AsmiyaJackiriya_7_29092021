import React from "react";
import Axios from 'axios';
import { useParams } from "react-router";
import './css/navbar.css'


function Profile() {
    const token = localStorage.getItem("email")
    let { id } = useParams();
    const config = {
        headers: {
            'Authorization': `token ${token}`
        }
    };
    const url = (`http://localhost:3000/api/auth/${id}`, config)
    Axios.get(url)
        .then((response) => {
            console.log(response)
        })

    return (
        <h1 className="profile">Profile</h1>
    )
}

export default Profile;