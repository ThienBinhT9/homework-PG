import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from '../../../components/Button/index.tsx'

import {buildQueryString, renderStatus, queryStringToObject } from '../../../utils/method.tsx'
import useDebouce from '../../../hooks/useDebouce.ts'
import { searchProduct } from "../../../services/payroll-service.ts";
import { useDispatch } from "react-redux";
import { ISearchParams } from "../../../interfaces/common-interface.ts";

function Filter({products}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params:ISearchParams = queryStringToObject(useLocation().search)
    
    const [status, setStatus] = useState(params.status?.toString().toLocaleLowerCase() || "status")
    const [client, setClient] = useState(params.client || "")
    const [invoice, setInvoice] = useState(params.invoice || "")

    const clientDebouce = useDebouce(client ? client : "", 600)
    const invoiceDebouce = useDebouce(invoice ? invoice : "", 600)    

    const handleFilter = () => {
        const _params = {
            status,
            client,
            invoice
        }
        const url = buildQueryString(_params)
        navigate(url)
    }

    const handleClear = () => {
        setStatus("status")
        setClient("")
        setInvoice("")
        navigate("/payroll")
    }

    const handleChangeClient = (e) => {
        setClient(e.target.value)
    }

    const handleChangeInvoice = (e) => {
        setInvoice(e.target.value)
    }

    useEffect(() => {

    },[clientDebouce, invoiceDebouce])

    return ( 
        <div className="payroll-filter">
            <select 
                className="filter-item filter-item-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                {renderStatus({text:"STATUS"})}
            </select>
            <input 
                className="filter-item filter-item-input" 
                placeholder="Client"
                value={client}
                onChange={handleChangeClient}
            />
            <input 
                className="filter-item filter-item-input" 
                placeholder="invoice#"
                value={invoice}
                onChange={handleChangeInvoice}
            />
            <Button 
                className="filter-item filter-item-btn" 
                text="Apply"
                disabled={!(status !== "status" || client || invoice)}
                primary={!!(status !== "status" || client || invoice)}
                onClick={handleFilter}
            />
            <Button 
                className="filter-item filter-item-btn" 
                text="Clear"
                disabled={!(status !== "status" || client || invoice)}
                primary={!!(status !== "status" || client || invoice)}
                onClick={handleClear}
            />
        </div>
    );
}

export default Filter;