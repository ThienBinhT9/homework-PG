import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store.ts";
import { IProduct } from "../../../interfaces/payroll-interface.ts";
import {formatDate, formatNumberVN} from '../../../utils/method.tsx'
import { deleteProduct } from '../../../services/payroll-service.ts'

import Modal from '../../../components/Modal/index.tsx'
import LoadingSpinner from "../../../components/Loading/SpinnerLoading.tsx";
import DetailItem from "./DetailItem.tsx";

interface Props{
    show:boolean
    onHide:() => void
}

function Trash(props: Props) {

    const {show, onHide} = props

    const {drafts, getAllDraft} = useSelector((state: RootState) => state.payroll)
    const token = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch()

    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)

    const handleDelete = (id:string) => {
        deleteProduct(dispatch, token, id)
        setShowModalDelete(false)
    }

    return ( 
        <>
            {show && (
                <Modal title="Thùng rác" show={show} onHide={onHide} size="xl">
                    {getAllDraft.isFetching && <LoadingSpinner />}
                    {!getAllDraft.isFetching && drafts && drafts.map((draft: IProduct, index: number) => {
                        return (
                            <div className="payroll-item" key={index}>
                                <p className="item__title"><span>{draft.status || "Status"}</span></p>
                                <p className="item__title"><span>{formatDate(draft.createdAt) || "Date"}</span></p>
                                <p className="item__title"><span>{draft.client || "Client"}</span></p>
                                <p className="item__title"><span>{draft.currency || "Currency"}</span></p>
                                <p className="item__title"><span>{formatNumberVN(Number(draft.total)) || "Total"}</span></p>
                                <p className="item__title"><span>{draft.invoice || "Invoice#"}</span></p>
                                <p className="item__title item__title-detail"><span onClick={() => setShowModalDetail(true)}>View detail</span></p>
                                <p className="item__title item__title-delete"><span onClick={() => setShowModalDelete(true)}>Delete</span></p>
                                <Modal title="Xóa sản phẩm" show={showModalDelete} textBtn2="Xóa" onHide={() => setShowModalDelete(false)} onSubmit={() => handleDelete(draft.id)}>
                                    <p>Sản phẩm sẽ bị xóa hoàn toàn</p>
                                </Modal>
                                {showModalDetail && <DetailItem item={draft} show={showModalDetail} onHide={() => setShowModalDetail(false)}/>}
                            </div>
                        )
                    })}
                    {!getAllDraft.isFetching && drafts.length === 0 && <div>Thùng rác trống</div>}
                </Modal>
            )}
        </>
     );
}

export default memo(Trash);