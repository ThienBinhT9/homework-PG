import {createSlice} from '@reduxjs/toolkit'

interface IUser{
    [key:string] : any
}

interface IUserState{
    user:IUser,
    getProfile:{
        isFetching:boolean,
        error:boolean
    },
    updateAvatar:{
        isFetching:boolean,
        error:boolean
    },
}

const initialState:IUserState = {
    user:{},
    getProfile:{
        isFetching:false,
        error:false,
    },
    updateAvatar:{
        isFetching:false,
        error:false,
    }
}

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        //GET PROFILE
        getProfileStart:(state: IUserState) => {
            state.getProfile.isFetching = true
            state.getProfile.error = false
        },
        getProfileSuccess:(state: IUserState, action) => {
            state.getProfile.isFetching = false
            state.user = action.payload
            state.getProfile.error = false
        },
        getProfileFailed:(state: IUserState) => {
            state.getProfile.isFetching = false
            state.getProfile.error = true
        },

        updateAvatarStart:(state: IUserState) => {
            state.updateAvatar.isFetching = true
            state.updateAvatar.error = false
        },
        updateAvatarSuccess:(state: IUserState) => {
            state.updateAvatar.isFetching = false
            state.updateAvatar.error = false
        },
        updateAvatarFailed:(state: IUserState) => {
            state.updateAvatar.isFetching = false
            state.updateAvatar.error = true
        },
    }
})

export const {
    getProfileStart,
    getProfileSuccess,
    getProfileFailed,
    updateAvatarStart,
    updateAvatarSuccess,
    updateAvatarFailed
} = userSlice.actions
export default userSlice.reducer