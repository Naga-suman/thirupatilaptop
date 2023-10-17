import React from 'react';
import { Alert, Space } from 'antd';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import {CreateNewCustomer as newCustomerCreaterCall,uploadPhoto as customerPhotoUpload} from '../../http/axioscalls';


// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const Loan = (handleLoanData) => {

  const logedUserId= useSelector((state) => state.login.userId);
  const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
  const [isSumbitSuccess, setisSumbitSuccess] = React.useState(false);
  const [loanDetails, setloanDetails] = React.useState({ loanAmt: '',tenure: '',roI: ''});
  const [submitSuccessMessage, setsubmitSuccessMessage] = React.useState('Customer was create successfully');

  const loanAmt = React.useRef("");
  const tenure = React.useRef("");
  const roI = React.useRef("");
  const emi = React.useRef("");
//   const navigate = useNavigate();

const onAmountChange = event => {
    setloanDetails({...loanDetails,loanAmt : event.target.value});
    emiForMonth(loanDetails);
}
const ontenureChange = event => {
    setloanDetails({...loanDetails,tenure : event.target.value});
    emiForMonth(loanDetails);
}
const onRoIChange = event => {
    setloanDetails({...loanDetails,roI : event.target.value});
    emiForMonth(loanDetails);
}

  const emiForMonth= (loanAmt,tenure,roI) => {
    if(loanAmt != '' && roI != '',tenure != ''){
        const emivalue = (loanAmt * (roI/100) * tenure)/(tenure * 12);
        emi= emivalue;

    }
   

  }

  return (
    <>
     <Typography gutterBottom variant="subtitle1">
        {isSumbitFailed ? <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={submitErrorMessage} type="error" />
        </Space> : ''}
        {isSumbitSuccess ? <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={submitSuccessMessage} type="success" />
        </Space> : ''}
      </Typography>
      <Formik
        initialValues={{
          financerId:logedUserId,
          loanAmt: '',
          tenure: '',
          emi: '',
          emidate: '',
          
          
          
        }}
        validationSchema={Yup.object().shape({
            loanAmt: Yup.string().max(255).required('Loan Amount is required'),
            tenure: Yup.string().max(255).required('Tenure is required'),
            roI:Yup.string().max(255).required('Rate of interest is required'),
            // emi: Yup.string().max(255).required('Engine Number is required'),
            emidate: Yup.string().max(255).required('Emi Date is required'),
            
          
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            newCustomerCreaterCall(values);
            handleLoanData(values);
            setisSumbitSuccess(true);
            setsubmitSuccessMessage('Customer was created successfully');
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            setSubmitErrorMessage("Failed to add Customer, Please try again");
            setisSumbitFailed(true);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="loanAmt-loan">Loan Amt*</InputLabel>
                  <OutlinedInput
                    id="loanAmt-loan"
                    type="loanAmt"
                    value={values.loanAmt}
                    name="loanAmt"
                    onBlur={handleBlur}
                    onChange={onAmountChange}
                    placeholder="John Daniel"
                    inputRef={loanAmt}
                    fullWidth
                    error={Boolean(touched.loanAmt && errors.loanAmt)}
                  />
                  {touched.loanAmt && errors.loanAmt && (
                    <FormHelperText error id="loanAmt-loan">
                      {errors.loanAmt}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="tenure-loan">Tenure*</InputLabel>
                  <OutlinedInput
                    id="tenure-loan"
                    type="tenure"
                    value={values.tenure}
                    name="tenure"
                    onBlur={handleBlur}
                    onChange={ontenureChange}
                    placeholder="John Daniel"
                    inputRef={tenure}
                    fullWidth
                    error={Boolean(touched.tenure && errors.tenure)}
                  />
                  {touched.tenure && errors.tenure && (
                    <FormHelperText error id="tenure-loan">
                      {errors.tenure}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="roI-loan">Rate of Interest*</InputLabel>
                  <OutlinedInput
                    id="roI-loan"
                    type="roI"
                    value={values.roI}
                    name="roI"
                    onBlur={handleBlur}
                    onChange={onRoIChange}
                    placeholder="John Daniel"
                    inputRef={roI}
                    fullWidth
                    error={Boolean(touched.roI && errors.roI)}
                  />
                  {touched.roI && errors.roI && (
                    <FormHelperText error id="roI-loan">
                      {errors.roI}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="emi-loan">Emi *</InputLabel>
                  <OutlinedInput
                    id="emi-loan"
                    type="emi"
                    value={values.emi}
                    name="emi"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    inputRef={emi}
                    fullWidth
                    error={Boolean(touched.emi && errors.emi)}
                  />
                  {touched.emi && errors.emi && (
                    <FormHelperText error id="emi-loan">
                      {errors.emi}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="emidate-loan">Due date</InputLabel>
                  <OutlinedInput
                    id="emidate-loan"
                    type="emidate"
                    value={values.emidate}
                    name="emidate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.emidate && errors.emidate)}
                  />
                  {touched.emidate && errors.emidate && (
                    <FormHelperText error id="emidate-loan">
                      {errors.emidate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button  disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Profile
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      
    </>
  );
};

export default Loan;