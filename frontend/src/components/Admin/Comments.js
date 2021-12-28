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

function Comments(props) {

    let { id } = useParams();

    const [comments, setComments] = useState([]);

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser.user.data.userId
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

    // supprimer un commentaire
    const deleteComment = (id) => {
        Axios.delete(`http://localhost:3000/api/comment/delete/${id}`, config)
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
                        <TableCell align="right">userId</TableCell>
                        <TableCell align="right">postId</TableCell>
                        <TableCell align="right">comment</TableCell>
                        <TableCell align="right">createdAt</TableCell>
                        <TableCell align="right">updatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comments.map((comment) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="right">{comment.id}</TableCell>
                            <TableCell align="right">{comment.userId}</TableCell>
                            <TableCell align="right">{comment.postId}</TableCell>
                            <TableCell align="right">{comment.comment}</TableCell>
                            <TableCell align="right">{comment.createdAt}</TableCell>
                            <TableCell align="right">{comment.updatedAt}</TableCell>
                            <TableCell align="right"sx={{cursor: 'pointer'}} onClick={() => deleteComment(comment.id)}><DeleteIcon/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withRouter(Comments)