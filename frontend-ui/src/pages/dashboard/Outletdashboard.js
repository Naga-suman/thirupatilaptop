// import { Link } from 'react-router-dom';

// material-ui
import {
  Grid,
  Typography,
  // Link
} from '@mui/material';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const MainScreen = (activate) => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={0} spacing={0}>
      {/* row 1 */}
      <Grid item xs={1} sx={{ mb: -2.25 }}>
        {activate === 'schemes' ?  <Typography variant="h5">Schemes</Typography>  : null}
       
      </Grid>
      <Grid item xs={1} >
        {  activate === 'customers' ?  <Typography variant="h5">Customers</Typography> :null}
    
      
      </Grid>

      <Grid item xs={1.5} >
       {activate === 'newScheme' ?  <Typography variant="h5">Create new Scheme</Typography> :null}
      
      </Grid>

      <Grid item xs={8.5} >
       {activate === 'newCustomer' ?  <Typography variant="h5">Create new customer</Typography> :null}
      
      </Grid>
      


    </Grid>
  );
};

export default MainScreen;
