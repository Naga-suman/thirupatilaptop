import React from 'react';
// import { Alert, Space } from 'antd';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import { uploadPhoto as customerPhotoUpload, baseUrl } from '../../http/axioscalls';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import avatarImage from '../../utils/static/images/person-avatar.jpeg';
// import Button from '@mui/material-next/Button';
import {
    Button,
    Grid,
    Stack,
    ImageList,
    ImageListItem,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


// material-ui


// third party


// project import
// import AnimateButton from 'components/@extended/AnimateButton';

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const CustomerProfile = (customerColloctor) => {

    // const [photo, setPhoto] = React.useState();
    const [photoId, setPhotoId] = React.useState(null);
    // const [photo, setPhoto] = React.useState();
    const logedUserId = useSelector((state) => state.login.userId);
    // const [isSumbitFailed, setisSumbitFailed] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    // const [submitErrorMessage, setSubmitErrorMessage] = React.useState(false);
    // const [isSumbitSuccess, setisSumbitSuccess] = React.useState(false);
    // const [submitSuccessMessage, setsubmitSuccessMessage] = React.useState('Customer was create successfully');

    const onFileChange = event => {
        // Update the state
        console.log('photo uploading');
        setloading(true);
        const formData = new FormData();
        formData.append(
            "file",
            event.target.files[0],
            event.target.files[0].name
        );
        // setPhotoId(customerPhotoUpload(formData));
        customerPhotoUpload(formData).then((data) => { setPhotoId(data.data) }).catch((ex) => console.log(ex));
        setloading(false);
    };


    return (
        <>
            <Formik
                initialValues={{
                    financerId: logedUserId,
                    photoId: photoId,
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
                        values.photoId = photoId;
                        customerColloctor.customerAction(values);
                        // newCustomerCreaterCall(values);
                        // setisSumbitSuccess(true);
                        // setsubmitSuccessMessage('Customer was created successfully');
                        setStatus({ success: false });
                        // setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                        // setSubmitErrorMessage("Failed to add Customer, Please try again");
                        // setisSumbitFailed(true);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} >
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="fullName-customer"
                                        type="fullName"
                                        value={values.fullName}
                                        name="fullName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John Daniel"
                                        fullWidth
                                        error={Boolean(touched.fullName && errors.fullName)}
                                        helperText={(touched.fullName && errors.fullName) ? errors.fullName : null}
                                        label="Full Name"
                                        variant="standard"
                                        sx={{
                                            width: 2 / 3
                                        }} />
                                    <TextField
                                        error={Boolean(touched.aadhar && errors.aadhar)}
                                        id="aadhar-customer"
                                        type="aadhar"
                                        value={values.aadhar}
                                        name="aadhar"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Aadhar"
                                        helperText={(touched.aadhar && errors.aadhar) ? errors.aadhar : null}
                                        variant="standard"
                                        sx={{
                                            width: 2 / 3
                                        }} />

                                    <TextField
                                        error={Boolean(touched.mobile && errors.mobile)}
                                        id="mobile"
                                        value={values.mobile}
                                        name="mobile"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="9000000000"
                                        label="Mobile No"
                                        helperText={(touched.mobile && errors.mobile) ? errors.mobile : null}
                                        variant="standard"
                                        sx={{
                                            width: 2 / 3
                                        }} />
                                    <TextField
                                        error={Boolean(touched.altmobile && errors.altmobile)}
                                        id="altmobile"
                                        value={values.altmobile}
                                        name="altmobile"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="9000000000"
                                        label="Alternate No"
                                        helperText={(touched.altmobile && errors.altmobile) ? errors.altmobile : null}
                                        variant="standard"
                                        sx={{
                                            width: 2 / 3
                                        }} />

                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        label="Email Id"
                                        helperText={(touched.email && errors.email) ? errors.email : null}
                                        variant="standard"
                                        sx={{
                                            width: 2 / 3
                                        }} />

                                    <TextField
                                        id="address"
                                        value={values.address}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Address"
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={(touched.address && errors.address) ? errors.address : null}
                                        variant="standard"
                                        sx={{
                                            width: 2 / 3
                                        }} />



                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>


                                    <ImageList sx={{ width: 400 }} cols={2} rowHeight={220} >
                                        <ImageListItem >
                                            <img
                                                srcSet={photoId ? `${baseUrl}api/v1/filehandler/${photoId}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`
                                                    : avatarImage}
                                                src={photoId ? `${baseUrl}api/v1/filehandler/${photoId}?w=164&h=164&fit=crop&auto=format`
                                                    : avatarImage}
                                                alt={"pass port photo"}
                                                loading="lazy"
                                            />

                                            
                                        </ImageListItem>
                                    </ImageList>
                                    <ImageList sx={{ width: 400 }} cols={2} rowHeight={220} >
                                    {loading ?
                                        <LoadingButton loading={loading} variant="text" sx={{
                                            
                                        }}>
                                            Uploading
                                        </LoadingButton>
                                        : photoId ?
                                            <Button component="label" variant="filledTonal" sx={{ color: "black" }} onClick={() => { setloading(false); setPhotoId(null); }}>
                                                Uploaded
                                                <CloseIcon />
                                            </Button>
                                            : <Button component="label" variant="filledTonal" sx={{ color: "black" , }} startIcon={<CloudUploadIcon />}>
                                                Upload photo
                                                <VisuallyHiddenInput type="file" onChange={onFileChange} />
                                            </Button>

                                    }
                                    </ImageList>
                                    
                                </Stack>
                            </Grid>
                            

                        </Grid>
                        <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={9} md={9}>
                        </Grid>
                            <Grid item xs={3} md={3}>
                                <Stack spacing={1}>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="filledTonal" sx={{ color: "black" }}  color="primary"
 endIcon={<SendIcon />}>
                                        NEXT
                                    </Button>
                                </Stack>

                            </Grid>
                        </Grid>



                        <br />

                       
                    </form>

                )}
            </Formik >

        </>
    );
};

export default CustomerProfile;