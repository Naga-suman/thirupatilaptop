// import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { CreateNewScheme } from '../../http/axioscalls';
import { Alert, Space } from 'antd';

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

const Scheme = () => {
  const logedUserId= useSelector((state) => state.login.userId);
  const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
  const [isSumbitSuccess, setisSumbitSuccess] = React.useState(false);
  const [submitSuccessMessage, setsubmitSuccessMessage] = React.useState('Customer was create successfully');

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
          schemeName: '',
          startDate: '',
          endDate: '',
          frequancy: '',
          oneTimePremimumAmt: '',
          maturityAmt: '',
          sunbmit:null
        }}
        validationSchema={Yup.object().shape({
            schemeName: Yup.string().max(255).required('First Name is required'),
            startDate: Yup.string().max(255).required('Last Name is required'),
            endDate: Yup.string().max(255).required('Mobile is required'),
            frequancy: Yup.string().required('Email is required'),
            oneTimePremimumAmt: Yup.string().max(255).required('House No is required'),
            maturityAmt: Yup.string().required('Village is required')
         
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            CreateNewScheme(values).catch((ex) => {
              console.log(ex);
              setSubmitErrorMessage("Failed to add Customer, Please try again");
              setisSumbitFailed(true);
            });
            setisSumbitSuccess(true);
            setsubmitSuccessMessage('Scheme was created successfully');
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="schemeName">Name*</InputLabel>
                  <OutlinedInput
                    id="schemeName"
                    type="txt"
                    value={values.schemeName}
                    name="schemeName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Secure Child"
                    fullWidth
                    error={Boolean(touched.schemeName && errors.schemeName)}
                  />
                  {touched.schemeName && errors.schemeName && (
                    <FormHelperText error id="helper-text-name">
                      {errors.schemeName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="startDate">Start Date*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.startDate && errors.startDate)}
                    id="startDate"
                    type="date"
                    value={values.startDate}
                    name="startDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.startDate && errors.startDate && (
                    <FormHelperText error id="helper-text-scheme_startDate">
                      {errors.startDate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="endDate">End Date</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.endDate && errors.endDate)}
                    id="endDate"
                    value={values.endDate}
                    name="endDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // placeholder="9000000000"
                    inputProps={{}}
                    type="date"
                  />
                  {touched.endDate && errors.endDate && (
                    <FormHelperText error id="helper-text-endDate">
                      {errors.endDate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="frequancy">Frequancy</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.frequancy && errors.frequancy)}
                    id="frequancy"
                    type="txt"
                    value={values.frequancy}
                    name="frequancy"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="monthly"
                    inputProps={{}}
                  />
                  {touched.frequancy && errors.frequancy && (
                    <FormHelperText error id="helper-text-house-No">
                      {errors.frequancy}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="oneTimePremimumAmt">Permimum Amount</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.oneTimePremimumAmt && errors.oneTimePremimumAmt)}
                    id="oneTimePremimumAmt"
                    type="number"
                    value={values.oneTimePremimumAmt}
                    name="oneTimePremimumAmt"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="99.999"
                    inputProps={{}}
                  />
                  {touched.oneTimePremimumAmt && errors.oneTimePremimumAmt && (
                    <FormHelperText error id="helper-text-village-town">
                      {errors.oneTimePremimumAmt}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="maturityAmt">Maturity Amount</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.maturityAmt && errors.maturityAmt)}
                    id="maturityAmt"
                    type="number"
                    value={values.maturityAmt}
                    name="maturityAmt"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.maturityAmt && errors.maturityAmt && (
                    <FormHelperText error id="helper-text-maturityAmt">
                      {errors.maturityAmt}
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
                    Create Scheme
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

export default Scheme;

