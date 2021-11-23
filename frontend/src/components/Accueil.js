import React, { useEffect, useState } from "react";
import './css/accueil.css';
import Axios from 'axios';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';

// After auth
function Home(props) {

    // const loggedInUser = useSelector((state) => state.loggedInUser.user)

    const [uploads, setUploads] = useState([]);
    const token = localStorage.getItem("email")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `token ${token}`
        }
    };

    useEffect(() => {
        Axios.get("http://localhost:3000/api/post/", config)
            .then((response) => {
                setUploads(response.data)
                console.log(response)
            })
            .catch((error) => {
                console.log('cannot get values');
            })
    }, [props.loggedInUser])

    return (
        <>
            <div className="home">
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


// Home page before auth
function GuestHome() {
    return (
        <>
            <h1>Communication interne</h1>
            <h2>Communiquer plus directement avec vos collègues</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur neque augue, imperdiet at tortor at, malesuada convallis felis. Vivamus lacinia orci ipsum, at vehicula risus euismod a. Curabitur venenatis ultrices tortor, in tempus quam vehicula eu. Morbi viverra enim eget porta suscipit. Praesent vulputate egestas purus sit amet vulputate. Mauris id suscipit neque, id pulvinar lorem. Suspendisse ultrices ligula lacus, eget porttitor ligula placerat a. Vivamus pretium eget odio vel aliquam.</p>

            {console.log('not logged')}
        </>
    )
}

function HomePage() {

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
        loggedIn ? (
            <Home loggedInUser={loggedInUser} />
        ) : (
            <GuestHome />
        )
    )
}

export default withRouter(HomePage);

