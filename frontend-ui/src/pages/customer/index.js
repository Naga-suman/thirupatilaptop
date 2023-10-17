
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
// import FirebaseRegister from './auth-forms/AuthRegister';
import NewCustomer from './newCustomer';
import AuthWrapper from '../authentication/AuthWrapper';
import OuterDashboard from '../dashboard/Outletdashboard';

// ================================|| REGISTER ||================================ //

const CustomerIndex = ({children}) => (
    <>
    <OuterDashboard activate='newCustomer'/>
    <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">New Customer </Typography>
                        <Typography component={Link} to="/customers" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            go to Customer
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {children ? children :<NewCustomer />}
                </Grid>
            </Grid>
        </AuthWrapper> 
     </>
);

export default CustomerIndex;

