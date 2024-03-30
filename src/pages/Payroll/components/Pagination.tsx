import React, {memo, useRef} from "react";
import { Pagination } from 'react-bootstrap'
import { useLocation, useNavigate } from "react-router-dom";

import { removePageQueryParam } from '../../../utils/method.tsx'

interface Props {
    currentPage:number,
    totalPages:number,
    totalProduct:number,
    onPageChange:(page:number) => void
}

function PaginationComp(props: Props) {

    const {currentPage, totalPages, totalProduct, onPageChange} = props  
    
    const navigate = useNavigate()
    const params = useLocation().search
    const locationRef = useRef("")
    locationRef.current = params
    
    
    const handleFirstPage = () => {
        onPageChange(1)
        if(locationRef.current){
            navigate(`/payroll${locationRef.current}&page=${1}`)
        }else{
            navigate(`/payroll?page=${1}`)
        }
    }

    const handlePrevPage = () => {
        if(currentPage === 1) return
        onPageChange(currentPage - 1)
        if(!locationRef.current){
            navigate(`/payroll?page=${currentPage - 1}`)
            return
        }else{
            if(locationRef.current.includes("page") && (locationRef.current.includes("client") || locationRef.current.includes("invoice") || locationRef.current.includes("stauts"))){
                console.log(removePageQueryParam(locationRef.current));
                navigate(`/payroll${removePageQueryParam(locationRef.current)}&page=${currentPage - 1}`)
                return
            }else if(!locationRef.current.includes("page") && (locationRef.current.includes("client") || locationRef.current.includes("invoice") || locationRef.current.includes("stauts"))){
                navigate(`/payroll${locationRef.current}&page=${currentPage - 1}`)
            }else{
                navigate(`/payroll?page=${currentPage - 1}`)
                return
            }
        }
    }

    const handleNextPage = () => {
        onPageChange(currentPage + 1)
        if(!locationRef.current){
            navigate(`?page=${currentPage + 1}`)
            return
        }else{
            if(locationRef.current.includes("page") && (locationRef.current.includes("client") || locationRef.current.includes("invoice") || locationRef.current.includes("stauts"))){

                navigate(`/payroll${removePageQueryParam(locationRef.current)}&page=${currentPage + 1}`)
                return
            }else if(!locationRef.current.includes("page") && (locationRef.current.includes("client") || locationRef.current.includes("invoice") || locationRef.current.includes("stauts"))){
                navigate(`/payroll${locationRef.current}&page=${currentPage + 1}`)
            }
            else{
                navigate(`/payroll?page=${currentPage + 1}`)
                return
            }
        }
    }

    const handleLastPage = () => {
        onPageChange(totalPages)
        if(locationRef.current){
            navigate(`/payroll${locationRef.current}&page=${totalPages}`)
        }else{
            navigate(`/payroll?page=${totalPages}`)
        }

    }

    return ( 
        <div className="payroll-paginate">
            <p>Showing <span>{currentPage * 6}</span> from <span>{totalProduct}</span> data</p>
            <Pagination>
                <Pagination.First disabled={currentPage === 1} onClick={handleFirstPage}/>
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}/>
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}/>
                <Pagination.Last onClick={handleLastPage} disabled={currentPage === totalPages}/>
            </Pagination>
        </div>
     );
}

export default memo(PaginationComp);