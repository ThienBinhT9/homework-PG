import React from "react";
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { renderStatus, formatString } from '../../../utils/method.tsx'
import { IUpdateParams } from '../../../interfaces/payroll-interface.ts'
import { updateProduct, getAllProduct } from '../../../services/payroll-service.ts'
import { RootState } from "../../../redux/store.ts";

import Modal from '../../../components/Modal/index.tsx'
import { useDispatch, useSelector } from "react-redux";

interface Props{
    item:any,
    show:boolean,
    onHide:() => void
}

function DetailItem(props: Props) {

    const {item, show, onHide} = props

    const token = useSelector((state: RootState) => state.auth.token)
    
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            status:item.status,
            order:item.order,
            total:item.total,
            currency:item.currency,
            fundingMethod:item.fundingMethod,
            client:item.client,
        },
        validationSchema:Yup.object({
            status:Yup.string()
            .required("Không được bỏ trống"),
            order:Yup.string()
            .required("Không được bỏ trống"),
            total:Yup.string()
            .required("Không được bỏ trống"),
            currency:Yup.string()
            .required("Không được bỏ trống"),
            fundingMethod:Yup.string()
            .required("Không được bỏ trống"),
            client:Yup.string()
            .required("Không được bỏ trống")
        }),
        onSubmit:async(values: IUpdateParams) => {
            const body = {...values, id:item.id}
            onHide()
            await updateProduct(dispatch, token, body)  
            await getAllProduct(dispatch, token)
        }
    })

    console.log(formik.values);
    
    return ( 
        <Modal title="Chi tiết sản phẩm" show={show} textBtn2="Update" onHide={onHide} onSubmit={formik.handleSubmit}>
            <div className="payroll-detailItem">
                <div className="payroll-detail-feild">
                    <select id="status" className="payroll-detail-select" value={formatString(formik.values.status)} onChange={formik.handleChange}>
                        {renderStatus({text:"STATUS"})}
                    </select>
                    {formik.errors.status && formik.touched.status && <span className="payroll-detail-message">{formik.errors.status}</span>}
                </div>   
                <div className="payroll-detail-feild">
                    <input id="order" className="payroll-detail-input" placeholder="Order" value={formik.values.order} onChange={formik.handleChange}/>
                    {formik.errors.order && formik.touched.order && <span className="payroll-detail-message">{formik.errors.order}</span>}
                </div>  
                <div className="payroll-detail-feild">
                    <input id="total" className="payroll-detail-input" placeholder="Total" value={formik.values.total} onChange={formik.handleChange}/>
                    {formik.errors.total && formik.touched.total && <span className="payroll-detail-message">{formik.errors.total}</span>}
                </div>  
                <div className="payroll-detail-feild">
                    <input id="currency" className="payroll-detail-input" placeholder="Currency" value={formik.values.currency} onChange={formik.handleChange}/>
                    {formik.errors.currency && formik.touched.currency && <span className="payroll-detail-message">{formik.errors.currency}</span>}
                </div>  
                <div className="payroll-detail-feild">
                    <input id="fundingMethod" className="payroll-detail-input" placeholder="Funding method" value={formik.values.fundingMethod} onChange={formik.handleChange}/>
                    {formik.errors.fundingMethod && formik.touched.fundingMethod && <span className="payroll-detail-message">{formik.errors.fundingMethod}</span>}
                </div>  
                <div className="payroll-detail-feild">
                    <input id="client" className="payroll-detail-input" placeholder="Client" value={formik.values.client} onChange={formik.handleChange}/>
                    {formik.errors.client && formik.touched.client && <span className="payroll-detail-message">{formik.errors.client}</span>}
                </div>   
            </div>      
        </Modal>
    );
}

export default DetailItem;