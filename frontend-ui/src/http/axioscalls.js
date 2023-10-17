import axios from "axios";
// import React from "react";

const baseUrl="http://localhost:8082/";
// const baseUrl="http://13.53.64.201:8082/";


const LoginRequest = async( userId, password) => {
    console.log("user is trying to login..... ");
    let response= null;
    // let response=null;
    await axios.post(baseUrl+"services/login",{userId:userId,password:password})
    .then((data) => {
      response=data.data;
      console.log(data)
    })
    .catch(error => {
        throw error;
       
    })
    return response;
  }

  const CreateNewCustomer = async( data) => {
    console.log("creating new customer..... ");
    let response= null;
    // let response=null;
    await axios.post(baseUrl+"api/v1/customer",data)
    .then((data) => {
      response=data;
    })
    .catch(error => {
        throw error;
       
    })
    return response;
  }

  const CreateNewScheme = async( data) => {
    console.log("user is trying to login..... ");
    let response= null;
    // let response=null;
    await axios.post(baseUrl+"api/v1/scheme",data)
    .then((data) => {
      response=data;
    })
    .catch(error => {
        throw error;
       
    })
    return response;
  }

  const GetFinancerCustomers = async( financerID) => {
    console.log("GetFinancerCustomers :: getting financer customers..... ");
    let response= null;
    // let response=null;
    await axios.get(baseUrl+"api/v1/finance/"+financerID+"/customers")
    .then((data) => {
      response=data;
    })
    .catch(error => {
        throw error;
       
    })
    return response;
  }

  const GetFinancerSchemes = async( financerID) => {
    console.log("user is trying to login..... ");
    let response= null;
    // let response=null;
    await axios.get(baseUrl+"api/v1/scheme/"+financerID)
    .then((data) => {
      response=data;
    })
    .catch(error => {
        throw error;
       
    })
    return response;
  }
  const uploadPhoto =  async( formdata) => {
    let response= null;
    await axios.post(baseUrl+"api/v1/filehandler/upload",formdata)
    .then((data) => {
      response=data;
    })
    .catch(error => {
        throw error;
       
    })
    return response;
  }


  export {LoginRequest,CreateNewCustomer,CreateNewScheme,GetFinancerCustomers,GetFinancerSchemes,uploadPhoto,baseUrl};
//   export const loginCall=loginRequest;
//   export const newCustomerCreaterCall=createNewCustomer;
