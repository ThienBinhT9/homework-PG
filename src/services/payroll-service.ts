import axios from 'axios'
import {toast} from 'react-toastify'

import { API_PATH } from '../configs/api-config.ts'
import {removeFalsyValues, isEmptyObject} from '../utils/method.tsx'
import {
    getAllStart, getAllSuccess, getAllFailed,
    updateStart, updateSuccess, updateFailed,
    deleteStart, deleteSuccess, deleteFailed,
    addDraftStart, addDraftSuccess, addDraftFailed,
    getAllDraftStart, getAllDraftSuccess, getAllDraftFailed,
    createStart, createSuccess, createFailed,
    searchStart, searchSuccess, searchFailed
} from '../redux/payrollSlice.ts'


export const getAllProduct = async(dispatch, token: string) => {
    try {
        dispatch(getAllStart())
        const results = await axios.get(API_PATH.getAllProduct, {
            headers:{
                Authorization:token
            }
        })
        if(!results.data.error){
            dispatch(getAllSuccess(results.data.data))
            return
        }
        dispatch(getAllFailed(results.data.message))
        return toast(results.data.message, {type:"error"})
    } catch (error) {
        dispatch(getAllFailed(error.response.data.message || "Có lỗi sảy ra"))
        return toast(error.response.data.message, {type:"error"})
    }
}

export const updateProduct = async(dispatch, token: string, body) => {
    try {
        dispatch(updateStart())
        const results = await axios.put(API_PATH.getAllProduct, body, {
            headers:{
                Authorization:token
            }
        })
        if(!results.data.error){
            dispatch(updateSuccess(results.data.message))
            return toast("Update thành công", {type:"success"})
        }
        dispatch(updateFailed(results.data.message))
        return toast(results.data.message, {type:"error"})
    } catch (error) {
        dispatch(updateFailed(error.response.data.message || "Có lỗi sảy ra"))
        return toast(error.response.data.message, {type:"error"})
    }
}

export const deleteProduct = async(dispatch, token: string, id:string) => {
    try {
        dispatch(deleteStart())
        const results = await axios.delete(`${API_PATH.getAllProduct}/${id}`, {
            headers:{
                Authorization:token
            }
        })
        if(!results.data.error){
            dispatch(deleteSuccess(id))
            return toast("Xóa sản phẩm thành công", {type:"success"})
        }
        dispatch(deleteFailed())
        return toast(results.data.message, {type:"error"})
    } catch (error) {
        dispatch(deleteFailed())
        return toast(error.response.data.message, {type:"error"})
    }
}

export const createProduct = async(dispatch, token: string, body) => {
    try {
        dispatch(createStart())
        const results = await axios.post(API_PATH.getAllProduct, body, {
            headers:{
                Authorization:token
            }
        })
        if(!results.data.error){
            dispatch(createSuccess())
            return toast("Tạo sản phẩm thành công", {type:"success"})
        }
        dispatch(createFailed())
        return toast(results.data.message, {type:"error"})
    } catch (error) {
        dispatch(createFailed())
        return toast(error.response.data.message, {type:"error"})
    }
}

export const searchProduct = async(dispatch, params, products) => {
    try {
        if(isEmptyObject(removeFalsyValues(params))) return        
        
        dispatch(searchStart())
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve("")
            },600)
        })
        dispatch(searchSuccess())
        return 
    } catch (error) {
        dispatch(searchFailed())
    }
}

//KHONG CO API NEN FAKE
export const addToDrafts = async(dispatch, token: string, id:string) => {
    try {
        dispatch(addDraftStart())
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("")
            }, 600)
        })
        dispatch(addDraftSuccess(id))
        return toast("Đã chuyển tới thùng rác", {type:"success"})
    } catch (error) {
        dispatch(addDraftFailed())
        return toast(error.response.data.message, {type:"error"})
    }
}

//KHONG CO API NEN FAKE
export const getAllDrafts = async(dispatch, token: string) => {
    try {
        dispatch(getAllDraftStart())
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("")
            }, 600)
        })
        dispatch(getAllDraftSuccess())
    } catch (error) {
        dispatch(getAllDraftFailed())
        return toast(error.response.data.message, {type:"error"})
    }
}