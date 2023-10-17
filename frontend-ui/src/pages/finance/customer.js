import React from 'react';
import { Alert, Space } from 'antd';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import {CreateNewCustomer as newCustomerCreaterCall,uploadPhoto as customerPhotoUpload} from '../../http/axioscalls';
import TextField from '@mui/material/TextField';


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

const Customer = () => {

  const [photo, setPhoto] = React.useState();
  const [photoId, setPhotoId] = React.useState();
  const logedUserId= useSelector((state) => state.login.userId);
  const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
  const [isSumbitSuccess, setisSumbitSuccess] = React.useState(false);
  const [submitSuccessMessage, setsubmitSuccessMessage] = React.useState('Customer was create successfully');
  // const [isErrors, setisErrors] = React.useState([]);
//   const navigate = useNavigate();
// setisErrors(['error']);

  // const [showPassword, setShowPassword] = useState(false);
  
  const onFileChange = event => {
    // Update the state
    setPhoto(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
        "file",
        photo,
        photo.name
    );
    setPhotoId(customerPhotoUpload(formData));
};

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
          photoId:photoId,
          fullName: '',
          aadhar: '',
          mobile: '',
          email: '',
          address: '',
          
          
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().max(255).required('Full Name is required'),
          aadhar: Yup.number().max(999999999999).required('Aadhar is required'),
          mobile: Yup.number().max(999999999999).required('Mobile is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          address: Yup.string().max(255).required('Address is required'),
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
                  <TextField id="standard-basic" label="Full Name" error variant="standard" />
                  <TextField id="standard-basic" label="Aadhar" variant="standard" />
                  <TextField id="standard-basic" label="Mobile No" variant="standard" />
                  <TextField id="standard-basic" label="Alternate No" variant="standard" />
                  <TextField id="standard-basic" label="Email Id" variant="standard" />
                  <TextField id="standard-basic" label="Address" variant="standard" />
                  <OutlinedInput
                    id="fullName-customer"
                    type="fullName"
                    value={values.fullName}
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.fullName && errors.fullName)}
                  />
                  {touched.fullName && errors.fullName && (
                    <FormHelperText error id="fullName-customer">
                      {errors.fullName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="aadhar-customer">Aadhar *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.aadhar && errors.aadhar)}
                    id="aadhar-customer"
                    type="aadhar"
                    value={values.aadhar}
                    name="aadhar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="1234-4567-8901-1234"
                    inputProps={{}}
                  />
                  {touched.aadhar && errors.aadhar && (
                    <FormHelperText error id="helper-text-aadhar-customer">
                      {errors.aadhar}
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
                  <InputLabel htmlFor="address-customer">House No</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                    id="address"
                    type="txt"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Address"
                    inputProps={{}}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-house-No">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="photo">Photo </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.photo && errors.photo)}
                    id="photo"
                    type="file"
                    value={values.photo}
                    name="photo"
                    onBlur={handleBlur}
                    onChange={onFileChange}
                    placeholder="photo"
                    inputProps={{}}
                  />
                  {touched.photo && errors.photo && (
                    <FormHelperText error id="helper-text-photo">
                      {errors.photo}
                    </FormHelperText>
                  )}
                </Stack>
                <Button   fullWidth size="large" type="submit" variant="contained" color="primary" onClick={onFileUpload}>
                  upload
                  </Button>
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

export default Customer;