import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import './Payroll.scss'
import {RootState} from '../../redux/store.ts'
import {getAllProduct} from '../../services/payroll-service.ts'
import { filterArrayByObjectValues, isEmptyObject, paginateData, queryStringToObject } from '../../utils/method.tsx'

import Filter from './components/Filter.tsx';
import Pagination from './components/Pagination.tsx';
import ListItem from './components/ListItem.tsx';
import Header from './components/Header.tsx'
import { ISearchParams } from '../../interfaces/common-interface.ts'
import { useLocation } from 'react-router-dom'

function Payroll() {

    const token = useSelector((state: RootState) => state.auth.token)
    console.log(token);
    
    const products = useSelector((state: RootState) => state.payroll.products)

    const dispatch = useDispatch()
    const params:ISearchParams = queryStringToObject(useLocation().search)
    

    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState(paginateData(products, currentPage))

    useEffect(() => {
        getAllProduct(dispatch, token)
    },[dispatch, token])

    useEffect(() => {
        const _data = paginateData(products, currentPage)
        setData(_data)
    },[currentPage, products])

    useEffect(() => {
        if(!isEmptyObject(params)){
            const _data = filterArrayByObjectValues([...products], params)
            setData(_data)
        }
    },[params.invoice, params.status, params.invoice, products])


    return ( 
        <div className='wrapper-payroll'>
            <div className='inner-payroll'>
                <Header />
                <Filter products={products}/>
                <ListItem products={data}/>
                <Pagination currentPage={currentPage} totalPages={Math.ceil(products.length / 6)} totalProduct={products.length} onPageChange={(p) => setCurrentPage(p)}/>
            </div>
        </div>
    );
}

export default Payroll;