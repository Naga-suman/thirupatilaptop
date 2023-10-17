import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
// import FirebaseRegister from './auth-forms/AuthRegister';
import Scheme from './scheme';
import AuthWrapper from '../authentication/AuthWrapper';
import OuterDashboard from '../dashboard/Outletdashboard';

// ================================|| REGISTER ||================================ //

const SchemeIndex = () => (
    <>
    <OuterDashboard activate='newScheme'/>
    <AuthWrapper>
        <Grid container spacing={1} rowSpacing={0}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">New Scheme </Typography>
                    <Typography component={Link} to="/dashboard/default" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        go to Schemes
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Scheme />
            </Grid>
        </Grid>
    </AuthWrapper>
    </>
    
);

export default SchemeIndex;
