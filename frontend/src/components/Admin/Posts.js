import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const useStyles = makeStyles({
    delete: {
      width: 'fit-content',
      textDecoration: 'underline',
      textDecorationColor: 'red',
      marginBottom: '10px',
      marginTop: '10px',
    }
  })

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

  const classes = useStyles();


  // Supprimer un post
  const deletePost = (id) => {
    Axios.delete(`http://localhost:3000/api/post/delete/${id}`, config)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <TableContainer component={Paper}>
      <Typography className={classes.delete} mt='30px' mb='30px' mr='auto' ml='auto'>Delete all posts</Typography>
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
