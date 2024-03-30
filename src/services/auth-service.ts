import axios from 'axios'
import { toast } from 'react-toastify'

import {
    loginStart, loginSuccess, loginFailed,
    registerStart, registerSuccess, registerFailed,
    logoutStart, logoutSuccess, logoutFailed
} from '../redux/authSlice.ts'
import { getProfileSuccess } from '../redux/userSlice.ts'
import {IParamsLogin, IParamsRegister} from '../interfaces/auth-interface.ts'
import {API_PATH} from '../configs/api-config.ts'


export const login = async(dispatch, navigate, body: IParamsLogin) => {
    try {
        dispatch(loginStart())
        const result = await axios.post(API_PATH.login, body)
        if(!result.data.error){
            dispatch(loginSuccess(result.data.data.token))
            dispatch(getProfileSuccess(result.data.data))
            navigate("/")
            return toast(`Xin chào "${result.data.data.name}"`, {type:"default"})
        }else{
            dispatch(loginFailed(result.data.message))
        }
    } catch (error) {
        dispatch(loginFailed(error.response.data.message))
    }
}

export const register = async(dispatch, navigate, body:IParamsRegister ) => {
    try {
        dispatch(registerStart())
        const result = await axios.post(API_PATH.register, body)
        if(!result.data.error){
            dispatch(registerSuccess(result.data.data.token))
            dispatch(getProfileSuccess(result.data.data))
            navigate("/")
            toast(`Tạo tài khoản thành công`, {type:"success"})
            toast(`Xin chào "${result.data.data.name}"`, {type:"default"})
            return
        }else{
            dispatch(registerFailed(result.data.message))
        }
    } catch (error) {
        dispatch(registerFailed(error.response.data.message))
    }
}

export const logout = async(dispatch) => {
    try {
        dispatch(logoutStart())
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("")
            },1000)
        })
        dispatch(logoutSuccess())
        dispatch(getProfileSuccess({}))
    } catch (error) {
        dispatch(logoutFailed("Có lỗi sảy ra"))
    }
}