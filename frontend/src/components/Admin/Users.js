import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

function Users(props) {

    let { id } = useParams();

    const [users, setUsers] = useState([]);

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

    // Récupérer tous les utilisateurs
    useEffect(() => {
        Axios.get("http://localhost:3000/api/auth/", config)
            .then((response) => {
                setUsers(response.data);
            })
    }, [])

    const usersColumns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'firstName', headerName: 'firstName', width: 140 },
        { field: 'lastName', headerName: 'lastName', width: 140 },
    ]

    return (
        <>
            {/* {comments.map((val, key) => ( */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={usersColumns}
                    pageSize={19}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            {/* ))} */}


        </>
    )
}

export default withRouter(Users)









// // Récupérer tous les utilisateurs
// useEffect(() => {
//     Axios.get("http://localhost:3000/api/auth/", config)
//         .then((response) => {
//             console.log(response.data);
//         })
// }, [])


