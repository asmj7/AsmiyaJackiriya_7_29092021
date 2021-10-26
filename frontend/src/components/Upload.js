import React, {useState} from "react";
import Axios from 'axios';
import './navbar.css';


function Upload() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState([])

    const upload = () => {

    // const formData = new FormData()
    // console.log(formData)
    
    Axios.post("http://localhost:3000/api/post/upload", {
            title: title,
            content: content,
            image: image
    })
    }

    return (
        <>
            <div className="upload">
                <h1>Créer une publication</h1>
                <div className="form">
                    <input type="text" placeholder="Titre..." name="title" className="inputTitle" onChange={(e) => setTitle(e.target.value)}></input>
                    <input type="text" placeholder="Quoi de neuf ?" className="inputContent" name="content" onChange={(e) => setContent(e.target.value)}></input>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0].name)}></input>
                    <button className="publish" onClick={upload}>Publier</button>
                </div>
            </div>
        </>
    )
}

export default Upload;