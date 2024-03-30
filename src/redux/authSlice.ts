import {createSlice} from '@reduxjs/toolkit'

interface IAuthState{
    token:string,
    login:{
        isFetching:boolean,
        message:string
        error:boolean
    },
    register:{
        isFetching:boolean,
        message:string
        error:boolean
    },
    logout:{
        isFetching:boolean,
        message:string
        error:boolean
    },
}

const initialState:IAuthState = {
    token:"",
    login:{
        isFetching:false,
        message:"",
        error:false
    },
    register:{
        isFetching:false,
        message:"",
        error:false
    },
    logout:{
        isFetching:false,
        message:"",
        error:false
    },
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        //LOGIN
        loginStart:(state: IAuthState) => {
            state.login.isFetching = true
            state.login.message = ""
            state.login.error = false
        },
        loginSuccess:(state: IAuthState, action) => {
            state.login.isFetching = false
            state.token = action.payload
            state.login.error = false
        },
        loginFailed:(state: IAuthState, action) => {
            state.login.isFetching = false
            state.login.message = action.payload
            state.login.error = true
        },

        //REGISTER
        registerStart:(state: IAuthState) => {
            state.register.isFetching = true
            state.register.message = ""
            state.register.error = false
        },
        registerSuccess:(state: IAuthState, action) => {
            state.register.isFetching = false
            state.token = action.payload
            state.register.error = false
        },
        registerFailed:(state: IAuthState, action) => {
            state.register.isFetching = false
            state.register.message = action.payload
            state.register.error = true
        },

        //LOGOUT
        logoutStart:(state: IAuthState) => {
            state.logout.isFetching = true
            state.logout.message = ""
            state.logout.error = false
        },
        logoutSuccess:(state: IAuthState) => {
            state.logout.isFetching = false
            state.token = ""
            state.logout.error = false
        },
        logoutFailed:(state: IAuthState, action) => {
            state.logout.isFetching = false
            state.logout.message = action.payload
            state.logout.error = true
        },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = authSlice.actions
export default authSlice.reducer