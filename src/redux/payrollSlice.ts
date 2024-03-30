import {createSlice} from '@reduxjs/toolkit'

import { IProduct } from '../interfaces/payroll-interface'
import { removeElementById, filterArrays, filterArrayByObjectValues } from '../utils/method.tsx'

interface IPayrollState{
    products:IProduct[],
    drafts:IProduct[],
    getAll:{
        isFetching:boolean,
        message:string
        error:boolean
    },
    getById:{
        isFetching:boolean,
        message:string
        error:boolean
    },
    create:{
        isFetching:boolean,
        error:boolean
    },
    update:{
        isFetching:boolean,
        message:string
        error:boolean
    },
    delete:{
        isFetching:boolean,
        error:boolean
    },
    addToDraft:{
        isFetching:boolean,
        error:boolean
    },
    getAllDraft:{
        isFetching:boolean,
        error:boolean
    },
    search:{
        isFetching:boolean,
        error:boolean
    },
}

const initialState:IPayrollState = {
    products:[],
    drafts:[],
    getAll:{
        isFetching:false,
        message:"",
        error:false
    },
    getById:{
        isFetching:false,
        message:"",
        error:false
    },
    create:{
        isFetching:false,
        error:false
    },
    delete:{
        isFetching:false,
        error:false
    },
    update:{
        isFetching:false,
        message:"",
        error:false
    },
    addToDraft:{
        isFetching:false,
        error:false
    },
    getAllDraft:{
        isFetching:false,
        error:false
    },
    search:{
        isFetching:false,
        error:false
    },
}

const payrollSlice = createSlice({
    name:"payroll",
    initialState:initialState,
    reducers:{
        //GET ALL
        getAllStart:(state: IPayrollState) => {
            state.getAll.isFetching = true
            state.getAll.message = ""
            state.getAll.error = false
        },
        getAllSuccess:(state: IPayrollState, action) => {
            state.getAll.isFetching = false
            const data = filterArrays(action.payload, state.drafts)
            state.products = data.products
            state.drafts = data.drafts
            state.getAll.error = false
        },
        getAllFailed:(state: IPayrollState, action) => {
            state.getAll.isFetching = false
            state.getAll.message = action.payload
            state.getAll.error = true
        },

        //UPDATE
        updateStart:(state: IPayrollState) => {
            state.update.isFetching = true
            state.update.message = ""
            state.update.error = false
        },
        updateSuccess:(state: IPayrollState, action) => {
            state.update.isFetching = false
            state.update.message = action.payload
            state.update.error = false
        },
        updateFailed:(state: IPayrollState, action) => {
            state.update.isFetching = false
            state.update.message = action.payload
            state.update.error = true
        },

        //DELETE
        deleteStart:(state: IPayrollState) => {
            state.delete.isFetching = true
            state.delete.error = false
        },
        deleteSuccess:(state: IPayrollState, action) => {
            state.delete.isFetching = false
            state.drafts = state.drafts.filter(draft => draft.id === action.payload)
            state.delete.error = false
        },
        deleteFailed:(state: IPayrollState) => {
            state.delete.isFetching = false
            state.delete.error = true
        },

        //CREATE
        createStart:(state: IPayrollState) => {
            state.create.isFetching = true
            state.create.error = false
        },
        createSuccess:(state: IPayrollState) => {
            state.create.isFetching = false
            state.create.error = false
        },
        createFailed:(state: IPayrollState) => {
            state.create.isFetching = false
            state.create.error = true
        },

        //SEARCH
        searchStart:(state: IPayrollState) => {
            state.search.isFetching = true
            state.search.error = false
        },
        searchSuccess:(state: IPayrollState) => {
            state.search.isFetching = false
            state.search.error = false
        },
        searchFailed:(state: IPayrollState) => {
            state.search.isFetching = false
            state.search.error = true
        },


        //ADD TO DRAFTS
        addDraftStart:(state: IPayrollState) => {
            state.addToDraft.isFetching = true
            state.addToDraft.error = false
        },
        addDraftSuccess:(state: IPayrollState, action) => {
            state.addToDraft.isFetching = false
            const data = removeElementById(state.products, action.payload)
            state.drafts.push(data.item)
            state.products = data.products
            state.addToDraft.error = false
        },
        addDraftFailed:(state: IPayrollState) => {
            state.addToDraft.isFetching = false
            state.addToDraft.error = true
        },

        //ADD TO DRAFTS
        getAllDraftStart:(state: IPayrollState) => {
            state.getAllDraft.isFetching = true
            state.getAllDraft.error = false
        },
        getAllDraftSuccess:(state: IPayrollState) => {
            state.getAllDraft.isFetching = false
            state.drafts = [...state.drafts]
            state.getAllDraft.error = false
        },
        getAllDraftFailed:(state: IPayrollState) => {
            state.getAllDraft.isFetching = false
            state.getAllDraft.error = true
        },

    }
})

export const {
    getAllStart, getAllSuccess, getAllFailed,
    updateStart, updateSuccess, updateFailed,
    deleteStart, deleteSuccess, deleteFailed,
    addDraftStart, addDraftSuccess, addDraftFailed,
    getAllDraftStart, getAllDraftSuccess, getAllDraftFailed,
    createStart, createSuccess, createFailed,
    searchStart, searchSuccess, searchFailed
} = payrollSlice.actions
export default payrollSlice.reducer