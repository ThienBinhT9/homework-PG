import React, { memo, useState } from "react";

import { getAllDrafts } from "../../../services/payroll-service.ts";
import { useDispatch } from "react-redux";

import Button from "../../../components/Button/index.tsx";
import Trash from "./Trash.tsx";
import CreateProduct from "./Create.tsx";

function Header() {

    const dispatch = useDispatch()

    const [showTrash, setShowTrash] = useState(false)
    const [showCreate, setShowCreate] = useState(false)

    const handleShowTrash = () => {
        setShowTrash(true)
        getAllDrafts(dispatch, "")
    }

    const handleShowCreate = () => {
        setShowCreate(true)
    }

    return ( 
        <div className='payroll-header'>
            <h1>Payroll Transactions List</h1>
            <div className='payroll-header-right'>
                <Button className="filter-item filter-item-btn" primary text="Create" onClick={handleShowCreate}/>
                <Button className="filter-item filter-item-btn" primary text="Trash" onClick={handleShowTrash}/>
                <p>Export CSV</p>
            </div>
            {showTrash && <Trash show={showTrash} onHide={() => setShowTrash(false)}/>}
            {showCreate && <CreateProduct show={showCreate} onHide={() => setShowCreate(false)}/>}
        </div> 
     );
}

export default memo(Header);