import React from 'react'
import { ToastContainer } from 'react-toastify'

import './MainLayout.scss'
import 'react-toastify/dist/ReactToastify.css'
import { RootState } from '../../redux/store.ts'

import Header from '../components/Header/Header.tsx'
import Footer from '../components/Footer/Footer.tsx'
import LoadingSpinner from '../../components/Loading/SpinnerLoading.tsx'
import { useSelector } from 'react-redux'

function MainLayout({children}) {

    const {isFetching} = useSelector((state: RootState) => state.auth.logout)

    return ( 
        <div className='wrapper-mainLayout'>
            {isFetching && <LoadingSpinner />}
            <ToastContainer />
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;