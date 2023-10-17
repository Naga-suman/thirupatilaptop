import { createSlice  } from '@reduxjs/toolkit';


const initialState={
    islogedIn:false,
    displayName:null,
    userEmail:null,
    userId:null

};

const login= createSlice({
    name:'login',
    initialState,
    reducers : {
        loginUser(state,action){
            console.log(action);
            state.displayName=action.payload.displayName;
            state.islogedIn=true;
            state.userEmail=action.payload.useremail;
            state.userId=action.payload.userId;
           
        },
        logoutUser(state){
            state.displayName=null;
            state.islogedIn=false;
            state.userEmail=null;
            state.userId=null;
            
        }
    }
})

export default login.reducer;
export const {loginUser,logoutUser}= login.actions