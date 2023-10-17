import React from 'react';
import { Alert, Space } from 'antd';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import {CreateNewCustomer as newCustomerCreaterCall} from '../../http/axioscalls';

import Customer from '../finance/customer';


// material-ui
import {
  Box,
  Button,
  FormControl,
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

const NewCustomer = () => {

  const logedUserId= useSelector((state) => state.login.userId);
  const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
  const [isSumbitSuccess, setisSumbitSuccess] = React.useState(false);
  const [submitSuccessMessage, setsubmitSuccessMessage] = React.useState('Customer was create successfully');
//   const navigate = useNavigate();


  const level='1';
  // const [showPassword, setShowPassword] = useState(false);
  

  return (
    <>
    <Customer/>
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
          firstname: '',
          lastname: '',
          mobile: '',
          email: '',
          houseNo: '',
          village: '',
          district: '',
          state: '',
          additionalData:''
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          mobile: Yup.number().max(9999999999).required('Mobile is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          houseNo: Yup.string().max(255).required('House No is required'),
          village: Yup.string().required('Village is required'),
          district: Yup.string().max(255).required('District is required'),
          state: Yup.string().max(255).required('State is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            newCustomerCreaterCall(values);
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
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="mobile">Mobile</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.mobile && errors.mobile)}
                    id="mobile"
                    value={values.mobile}
                    name="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="9000000000"
                    inputProps={{}}
                  />
                  {touched.mobile && errors.mobile && (
                    <FormHelperText error id="helper-text-mobile">
                      {errors.mobile}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="house-No">House No</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.houseNo && errors.houseNo)}
                    id="houseNo"
                    type="txt"
                    value={values.houseNo}
                    name="houseNo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="x-xx"
                    inputProps={{}}
                  />
                  {touched.houseNo && errors.houseNo && (
                    <FormHelperText error id="helper-text-house-No">
                      {errors.houseNo}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="village">Village/ Town</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.village && errors.village)}
                    id="village"
                    type="txt"
                    value={values.village}
                    name="village"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="village / Town"
                    inputProps={{}}
                  />
                  {touched.village && errors.village && (
                    <FormHelperText error id="helper-text-village-town">
                      {errors.village}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="district">District</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.district && errors.district)}
                    id="district"
                    type="txt"
                    value={values.district}
                    name="district"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="district"
                    inputProps={{}}
                  />
                  {touched.district && errors.district && (
                    <FormHelperText error id="helper-text-district">
                      {errors.district}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="state">State</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.state && errors.state)}
                    id="state"
                    type="txt"
                    value={values.state}
                    name="state"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="state"
                    inputProps={{}}
                  />
                  {touched.state && errors.state && (
                    <FormHelperText error id="helper-text-state">
                      {errors.state}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="additiona-data">Additional Data</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.additionalData && errors.additionalData)}
                    id="additiona-data"
                    type="txt"
                    value={values.additionalData}
                    name="additiona-data"
                    onBlur={handleBlur}
                    
                    inputProps={{}}
                  />
                  {touched.additionalData && errors.additionalData && (
                    <FormHelperText error id="helper-text-additiona-data">
                      {errors.additionalData}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button  disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Customer
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

export default NewCustomer;