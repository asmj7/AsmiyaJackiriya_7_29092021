import React, { useEffect, useState } from "react";
import './accueil.css';
import Axios from 'axios';

function Home() {

    const [uploads, setUploads] = useState([]);

    // useEffect(() => {
    //     if (!localStorage.getItem("loggedIn")) {
    //         localStorage.setItem("loggedIn", false)
    //     }
    // })

    useEffect(() => {
        Axios.get("http://localhost:3000/api/auth/")
            .then((response) => {
                setUploads(response.data)
            })
    }, [])

    return (
        <>
            <div className="home">
                <h1>Bienvenue sur l'app !</h1>
                {uploads.map(val => (
                    <div className="post">
                    <div className="postContainer">
                        <h2 className="title">{val.title}</h2>
                        <div className="imgContainer">
                            <img src={val.imageUrl} alt="img"></img>
                        </div>
                        <div className="content">
                            <div className="description">
                                {val.content}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}

export default Home;

