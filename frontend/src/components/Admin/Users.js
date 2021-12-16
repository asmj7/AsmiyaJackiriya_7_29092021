import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

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

    // supprimer un utilisateur
    const deleteUser = (id) => {
        Axios.delete(`http://localhost:3000/api/auth/delete/${id}`, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">firstName</TableCell>
                        <TableCell align="right">lastName</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((users) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="right">{users.id}</TableCell>
                            <TableCell align="right">{users.firstName}</TableCell>
                            <TableCell align="right">{users.lastName}</TableCell>
                            <TableCell sx={{cursor: 'pointer'}} onClick={() => deleteUser(users.id)} align="right"><DeleteIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withRouter(Users)