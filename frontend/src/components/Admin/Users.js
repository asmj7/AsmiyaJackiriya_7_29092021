import React, { useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteUserRedux, getUsers } from "../../redux/actions/userActions";

function Users(props) {

    const users = useSelector((state) => state.loggedInUser.users)
    const dispatch = useDispatch();

    // Récupérer tous les utilisateurs
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    // supprimer un utilisateur
    const deleteUser = useCallback((id) => {
        dispatch(deleteUserRedux(id))
        dispatch(getUsers())
    }, [dispatch, users])

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
                    {users.map((users, key) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={key}
                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="right">{users.id}</TableCell>
                            <TableCell align="right">{users.firstName}</TableCell>
                            <TableCell align="right">{users.lastName}</TableCell>
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => deleteUser(users.id)} align="right"><DeleteIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withRouter(Users)