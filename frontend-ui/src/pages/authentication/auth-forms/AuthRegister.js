import { useEffect, useState } from 'react';
import React from 'react';
import { Alert, Space } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {

  const logedUserId= useSelector((state) => state.login.userId);
  const cust_firstname =React.useRef("");
  const cust_lastname=React.useRef("");
  const cust_mobile=React.useRef(0);
  const cust_email=React.useRef("");
  const cust_houseNo=React.useRef("");
  const cust_village=React.useRef("");
  const cust_district=React.useRef("");
  const cust_state=React.useRef("");
  const cust_additionalData=React.useRef("");
  const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
  const navigate = useNavigate();


  const [customerData, setCustomerData]=useState({
    financerId:logedUserId,
    firstname:'',
    lastname:'',
    mobile:'',
    email:'',
    houseNo:'', 
    village:'', 
    district:'', 
    state:'', 
    additionalData:''
  }); 
  
  const createCustomer = async (customerData) => {
    console.log("user is trying to login..... ");
    // let response=null;
    await axios.post("http://localhost:8082/api/v1/customer",customerData)
    .then((data) => {
     
      if(data.data === 'success'){
        navigate('/dashboard/default');
      }else{
        setSubmitErrorMessage("Failed to login please check the credentials and try again");
        setisSumbitFailed(true);
      }
     

    } )
    .catch(error => {
        console.log(error)
    })
  }
  
  const [level, setLevel] = React.useState();
  // const [showPassword, setShowPassword] = useState(false);
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };
  const submitHandler= () => {
    console.log(cust_additionalData.current.value)
    setCustomerData({...customerData,
        firstname:cust_firstname.current.value,
        lastname:cust_lastname.current.value,
        mobile:cust_mobile.current.value,
        email:cust_email.current.value,
        houseNo:cust_houseNo.current.value, 
        village:cust_village.current.value, 
        district:cust_district.current.value, 
        state:cust_state.current.value, 
        additionalData:cust_additionalData.current.value
      } );
      

      createCustomer(customerData);
    console.log('submit clicked ');
    console.log(customerData)
  }

  useEffect(() => {
    if(logedUserId === null){
      navigate('/login');
    }
    changePassword('');
  }, []);

  return (
    <>
     <Typography gutterBottom variant="subtitle1">
        {isSumbitFailed ? <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={submitErrorMessage} type="error" />
        </Space> : ''}
      </Typography>
      <Formik
        initialValues={{
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
          mobile: Yup.number().max(255).required('Mobile is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          houseNo: Yup.string().max(255).required('House No is required'),
          village: Yup.string().required('Village is required'),
          district: Yup.string().max(255).required('District is required'),
          state: Yup.string().max(255).required('State is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
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
                    inputRef={cust_firstname}
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
                    inputRef={cust_lastname}
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
                    value={values.company}
                    name="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="9000000000"
                    inputProps={{}}
                    type="number"
                    inputRef={cust_mobile}
                  />
                  {touched.company && errors.company && (
                    <FormHelperText error id="helper-text-mobile">
                      {errors.company}
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
                    inputRef={cust_email}
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
                    inputRef={cust_houseNo}
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
                    inputRef={cust_village}
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
                    inputRef={cust_district}
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
                    inputRef={cust_state}
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
                    error={Boolean(touched.password && errors.password)}
                    id="additiona-data"
                    type="txt"
                    value={values.password}
                    name="additiona-data"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    inputProps={{}}
                    inputRef={cust_additionalData}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-additiona-data">
                      {errors.password}
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
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button onClick={submitHandler} disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
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

export default AuthRegister;
