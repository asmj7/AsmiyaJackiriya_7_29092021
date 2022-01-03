import React, { useCallback, useEffect, useState } from "react";
import Axios from 'axios';
import { withRouter } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteOnePost, getPosts } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Posts(props) {

  const posts = useSelector((state) => state.post.posts)

  const dispatch = useDispatch();
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
    dispatch(getPosts());
  }, [props.loggedInUser]);

  // Supprimer un post
  const deletePost = useCallback((id) => {
    console.log(id);
    dispatch(deleteOnePost(id));
    dispatch(getPosts())
}, [dispatch, posts])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, borderTop: 'solid' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">userId</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">likes</TableCell>
            <TableCell align="right">imageUrl</TableCell>
            <TableCell align="right">content</TableCell>
            <TableCell align="right">createdAt</TableCell>
            <TableCell align="right">updatedAt</TableCell>
            {/* <TableCell align='right'><DeleteIcon/></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.userId}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.likes}</TableCell>
              <TableCell align="right">{row.imageUrl}</TableCell>
              <TableCell align="right">{row.content}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
              <TableCell sx={{cursor: 'pointer'}} onClick={() => deletePost(row.id)} align="right"><DeleteIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withRouter(Posts)
