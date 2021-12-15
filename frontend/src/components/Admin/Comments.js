import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

function Comments(props) {

    let { id } = useParams();


    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

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

    // Récupérer les commentaire du post
    useEffect(() => {
        Axios({
            method: "GET",
            url: `http://localhost:3000/api/comment/`,
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setComments(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    const commentColumns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'userId', headerName: 'userId', width: 140 },
        { field: 'postId', headerName: 'postId', width: 140 },
        { field: 'comment', headerName: 'comment', width: 140 },
        { field: 'createdAt', headerName: 'createdAt', width: 140 },
        { field: 'updatedAt', headerName: 'updatedAt', width: 140 },
    ]

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={comments}
                    columns={commentColumns}
                    pageSize={19}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default withRouter(Comments)