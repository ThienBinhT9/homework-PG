import React, { useState } from "react";

import {formatNumberVN, formatDate} from '../../../utils/method.tsx'
import {addToDrafts} from '../../../services/payroll-service.ts'

import Modal from '../../../components/Modal/index.tsx'
import DetailItem from "./DetailItem.tsx";
import { useDispatch } from "react-redux";

function Item({item}) {

    const dispatch = useDispatch()

    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)

    const handleToTrash = () => {
        addToDrafts(dispatch, "", item.id)
        setShowModalDelete(false)
    }

    return ( 
        <div className="payroll-item">
            <p className="item__title"><span>{item.status || "Status"}</span></p>
            <p className="item__title"><span>{formatDate(item.createdAt) || "Date"}</span></p>
            <p className="item__title"><span>{item.client || "Client"}</span></p>
            <p className="item__title"><span>{item.currency || "Currency"}</span></p>
            <p className="item__title"><span>{formatNumberVN(Number(item.total)) || "Total"}</span></p>
            <p className="item__title"><span>{item.invoice || "Invoice#"}</span></p>
            <p className="item__title item__title-detail"><span onClick={() => setShowModalDetail(true)}>{item.status ? "View detail" : ""}</span></p>
            <p className="item__title item__title-delete"><span onClick={() => setShowModalDelete(true)}>{item.status ? "Delete" : ""}</span></p>
            <Modal title="Chuyển tới thùng rác" show={showModalDelete} textBtn2="Xóa" onHide={() => setShowModalDelete(false)} onSubmit={handleToTrash}>
                <p>Sản phẩm sẽ chuyển tới thùng rác và xóa sau 30 ngày</p>
            </Modal>
            {showModalDetail && <DetailItem item={item} show={showModalDetail} onHide={() => setShowModalDetail(false)}/>}
        </div>
     );
}

export default Item;