import { Link } from 'react-router-dom';
import React from 'react';

import {logoutUser } from '../../store/reducers/login';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import { useDispatch } from 'react-redux';


// ================================|| LOGIN ||================================ //

const Loginout = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(logoutUser())
    },[])

    return (
            <AuthWrapper>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h5">You have been logout Successfully</Typography>
                    <Typography variant="h5">Click Login to Login</Typography>
                    <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Log In
                    </Typography>
                    </Stack>
                </Grid>
                </Grid>
            </AuthWrapper>
    )
}
  
export default Loginout;
