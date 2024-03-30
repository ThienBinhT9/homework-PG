import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom'

import { RootState } from '../../redux/store.ts'

function ProtectRoute() {

    const token = useSelector((state: RootState) => state.auth.token)

    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    },[token, navigate])

    return ( 
        <>
            <Outlet />
        </>
    );
}

export default ProtectRoute;