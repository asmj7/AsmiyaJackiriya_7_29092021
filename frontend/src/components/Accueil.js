import React, { useEffect, useState } from "react";
import './accueil.css';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function Home() {
    const token = localStorage.getItem("email")
    
    const config = {
        headers: {
            'Authorization': `token ${token}`
        }
    };
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3000/api/post/", config)
            .then((response) => {
                // setUploads(response.data)
                console.log(response)
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

export default withRouter(Home);

