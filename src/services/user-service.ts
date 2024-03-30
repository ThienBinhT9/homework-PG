import axios from 'axios'
import { toast } from 'react-toastify'

import { API_PATH } from '../configs/api-config.ts'
import {
    getProfileStart, getProfileSuccess, getProfileFailed,
    updateAvatarStart, updateAvatarSuccess, updateAvatarFailed
} from '../redux/userSlice.ts'

export const getProfileUser = async(dispatch, token: string) => {
    try {
        dispatch(getProfileStart())
        const result = await axios.get(API_PATH.getProfile, {
            headers:{
                Authorization:token
            }
        })
        if(!result.data.error){
            dispatch(getProfileSuccess(result.data.data))
            return
        }
        dispatch(getProfileFailed(result.data.message))
        return toast(result.data.message, {type:"error"})
    } catch (error) {
        dispatch(getProfileFailed(error.response.data.message))
        return toast(error.response.data.message, {type:"error"})

    }
}

export const updateAvatarUser = async(dispatch, token: string, body) => {
    try {
        dispatch(updateAvatarStart())
        const result = await axios.put(API_PATH.getProfile, body, {
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:token
            }
        })
        if(!result.data.error){
            dispatch(updateAvatarSuccess())
            return toast(result.data.message, {type:"success"})
        }
        dispatch(updateAvatarFailed())
        return toast(result.data.message, {type:"error"})
    } catch (error) {
        dispatch(updateAvatarFailed())
        return toast(error.response.data.message, {type:"error"})

    }
}