import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
function Admin() {


    return (
        <>
            <Box mt='40px' display='flex' justifyContent='space-evenly'>
                <Link to='/admin/users'>Users</Link>
                <Link to='/admin/posts'>Posts</Link>
                <Link to='/admin/comments'>Comments</Link>
            </Box>
        </>
    )

}

export default withRouter(Admin)