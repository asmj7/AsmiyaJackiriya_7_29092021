import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

function Posts(props) {

    let { id } = useParams();

    const [posts, setPosts] = useState([]);

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser.data.userId
    const token = localStorage.getItem("email")

    const config = {
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    // Récupérer tous les posts
    useEffect(() => {
        Axios.get("http://localhost:3000/api/post/", config)
            .then((response) => {
                setPosts(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [props.loggedInUser]);

    const postsColumns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'userId', headerName: 'userId', width: 140 },
        { field: 'title', headerName: 'title', width: 140 },
        { field: 'likes', headerName: 'likes', width: 140 },
        { field: 'imageUrl', headerName: 'imageUrl', width: 140 },
        { field: 'content', headerName: 'content', width: 140 },
        { field: 'createdAt', headerName: 'createdAt', width: 140 },
        { field: 'updatedAt', headerName: 'updatedAt', width: 140 },
    ]

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={posts}
                    columns={postsColumns}
                    pageSize={19}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default withRouter(Posts)
