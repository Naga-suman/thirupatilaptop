import React from 'react';

import { useSelector } from 'react-redux';
import { GetFinancerCustomers } from '../../http/axioscalls';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CustomerProfile from '../finance/surity';
import {
  Grid,
  Paper,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Autocomplete,
  TextField,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loan from '../finance/loan';
import Vechile from '../finance/vechile';



// material-ui
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const FinanceModule = () => {

  const logedUserId = useSelector((state) => state.login.userId);
  const [rows, setRows] = React.useState([]);
  const [customer, setCustomer] = React.useState();
  const [surity, setSurity] = React.useState();
  const [isNewCustomer, setIsNewCustomer] = React.useState(false);
  const [isNewSurity, setIsNewSurity] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [newSurity, setNewSurity] = React.useState(false);
  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    GetFinancerCustomers(logedUserId).then(async (data) => { console.log(data.data); await setRows(data.data) }).catch((ex) => console.log(ex));
  }, []);


  const newCustomerCollector = (newcustomer) => {
    setNewCustomer(newcustomer);
    console.log(newCustomer);
  }
  const newSurityCollector = (newsurity) => {
    setNewSurity(newsurity);
    console.log(newSurity);
  }

  return (
    <>
      <Typography>

        <ThemeProvider theme={lightTheme}>
          <Box sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '2 1fr' },
            gap: 2,
          }}>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Customer Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Item xs={12} md={6}>
                  <Autocomplete
                    value={customer}
                    onChange={(event, newValue) => { setCustomer(newValue) }}
                    options={rows}
                    getOptionLabel={(option) => `${option.fullName} (${option.mobile1})`}
                    id="customer"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField {...params} label="Choose a customer" variant="standard" />
                    )}
                    sx={{
                      width: 1 / 2
                    }}
                  />
                  <br />
                  <Fab variant="extended" size="small" onClick={() => { setIsNewCustomer(true) }}>
                    <AddIcon />
                    New Customer
                  </Fab>
                  {isNewCustomer ? <CustomerProfile customerAction={newCustomerCollector} /> : null}
                </Item>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Surity Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <Item xs={12} md={6}>
                  <Autocomplete
                    value={customer}
                    onChange={(event, newValue) => { setCustomer(newValue) }}
                    options={rows}
                    getOptionLabel={(option) => `${option.fullName} (${option.mobile1})`}
                    id="customer"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField {...params} label="Choose a customer" variant="standard" />
                    )}
                    sx={{
                      width: 1 / 2
                    }}
                  />
                  <br />
                  <Fab variant="extended" size="small" onClick={() => { setIsNewCustomer(true) }}>
                    <AddIcon />
                    New Customer
                  </Fab>
                  {isNewCustomer ? <CustomerProfile customerAction={newCustomerCollector} /> : null}
                </Item>

              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Vechile Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                 <Vechile/>
                
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Loan Detail</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Loan/>
              </AccordionDetails>
            </Accordion>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} columns={{ xs: 1, md: 2 }}>
                <Item xs={12} md={6}>

                  <Autocomplete
                    value={surity}
                    onChange={(event, newValue) => { setSurity(newValue) }}
                    options={rows}
                    getOptionLabel={(option) => `${option.fullName} (${option.mobile1})`}
                    id="surity"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField {...params} label="Choose a Surity" variant="standard" />
                    )}
                    sx={{
                      width: 1 / 2
                    }}
                  />
                  <br />
                  <Fab variant="extended" size="small" onClick={() => { setIsNewSurity(true) }}>
                    <AddIcon />
                    New Customer
                  </Fab>
                  {isNewCustomer ? <CustomerProfile customerAction={newSurityCollector} /> : null}
                </Item>
              </Grid>


            </Grid>



          </Box>
        </ThemeProvider>

        <Box>

        </Box>
      </Typography>

    </>
  );
};

export default FinanceModule;