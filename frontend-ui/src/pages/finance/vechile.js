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

const Vechile = () => {

  const logedUserId= useSelector((state) => state.login.userId);
  const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
  const [isSumbitSuccess, setisSumbitSuccess] = React.useState(false);
  const [submitSuccessMessage, setsubmitSuccessMessage] = React.useState('Customer was create successfully');
//   const navigate = useNavigate();


  // const [showPassword, setShowPassword] = useState(false);
  
  

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
          vechileNo: '',
          chassisNo: '',
          engineNo: '',
          modelName: '',
          dofMfd: '',
          insuranceCompany:'',
          policyNo:'',
          
          
        }}
        validationSchema={Yup.object().shape({
            vechileNo: Yup.string().max(255).required('Vechile No Name is required'),
            chassisNo: Yup.string().max(255).required('Chassis Number is required'),
            engineNo: Yup.string().max(255).required('Engine Number is required'),
            modelName: Yup.string().max(255).required('Model Name is required'),
            dofMfd: Yup.string().max(255).required('Date of Manufatured is required'),
            insuranceCompany: Yup.string().max(255).required('Company is required'),
            policyNo: Yup.string().max(255).required('Policy number is required'),
          
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
                  <InputLabel htmlFor="vechileNo-vechile">Vechile No*</InputLabel>
                  <OutlinedInput
                    id="vechileNo-vechile"
                    type="vechileNo"
                    value={values.vechileNo}
                    name="vechileNo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.vechileNo && errors.vechileNo)}
                  />
                  {touched.vechileNo && errors.vechileNo && (
                    <FormHelperText error id="vechileNo-vechile">
                      {errors.vechileNo}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="chassisNo-vechile">Chassis No*</InputLabel>
                  <OutlinedInput
                    id="chassisNo-vechile"
                    type="chassisNo"
                    value={values.chassisNo}
                    name="chassisNo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.chassisNo && errors.chassisNo)}
                  />
                  {touched.chassisNo && errors.chassisNo && (
                    <FormHelperText error id="chassisNo-vechile">
                      {errors.chassisNo}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="engineNo-vechile">Engine No*</InputLabel>
                  <OutlinedInput
                    id="engineNo-vechile"
                    type="engineNo"
                    value={values.engineNo}
                    name="engineNo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.engineNo && errors.engineNo)}
                  />
                  {touched.engineNo && errors.engineNo && (
                    <FormHelperText error id="engineNo-vechile">
                      {errors.engineNo}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="modelName-vechile">Model Name*</InputLabel>
                  <OutlinedInput
                    id="modelName-vechile"
                    type="modelName"
                    value={values.modelName}
                    name="modelName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.modelName && errors.modelName)}
                  />
                  {touched.modelName && errors.modelName && (
                    <FormHelperText error id="modelName-vechile">
                      {errors.modelName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="dofMfd-vechile">Date of MFD*</InputLabel>
                  <OutlinedInput
                    id="dofMfd-vechile"
                    type="dofMfd"
                    value={values.dofMfd}
                    name="dofMfd"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.dofMfd && errors.dofMfd)}
                  />
                  {touched.dofMfd && errors.dofMfd && (
                    <FormHelperText error id="dofMfd-vechile">
                      {errors.dofMfd}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="insuranceCompany-vechile">Insurance Company*</InputLabel>
                  <OutlinedInput
                    id="insuranceCompany-vechile"
                    type="insuranceCompany"
                    value={values.insuranceCompany}
                    name="insuranceCompany"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.insuranceCompany && errors.insuranceCompany)}
                  />
                  {touched.insuranceCompany && errors.insuranceCompany && (
                    <FormHelperText error id="insuranceCompany-vechile">
                      {errors.insuranceCompany}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="policyNo-vechile">Policy No</InputLabel>
                  <OutlinedInput
                    id="policyNo-vechile"
                    type="policyNo"
                    value={values.policyNo}
                    name="policyNo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Daniel"
                    fullWidth
                    error={Boolean(touched.policyNo && errors.policyNo)}
                  />
                  {touched.policyNo && errors.policyNo && (
                    <FormHelperText error id="policyNo-vechile">
                      {errors.policyNo}
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

export default Vechile;