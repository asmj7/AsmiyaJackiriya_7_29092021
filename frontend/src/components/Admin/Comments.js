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
import { deleteCommentRedux, getComments } from "../../redux/actions/userActions";

function Comments(props) {

    const comments = useSelector((state) => state.post.comments)
    const dispatch = useDispatch();

    // Récupérer les commentaire du post
    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    // supprimer un commentaire
    const deleteComment = useCallback((id) => {
        dispatch(deleteCommentRedux(id));
        dispatch(getComments())
    }, [dispatch, comments])

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
                    {comments?.map((comment) => (
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
                            <TableCell align="right" sx={{ cursor: 'pointer' }} onClick={() => deleteComment(comment.id)}><DeleteIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withRouter(Comments)