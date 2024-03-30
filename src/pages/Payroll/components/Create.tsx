import React from "react";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store.ts";
import {renderStatus} from '../../../utils/method.tsx'
import {createProduct, getAllProduct} from '../../../services/payroll-service.ts'

import Modal from '../../../components/Modal/index.tsx'

interface Props{
    show:boolean
    onHide:() => void
}

function CreateProduct(props: Props) {

    const {show, onHide} = props

    const token = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            status:"status",
            order:"",
            total:"",
            currency:"",
            fundingMethod:"",
            client:"",
            invoice:""
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
            .required("Không được bỏ trống"),
            invoice:Yup.string()
            .required("Không được bỏ trống")
        }),
        onSubmit:async(values) => {  
            onHide()
            await createProduct(dispatch, token, values)
            await getAllProduct(dispatch, token)
        }
    })

    return ( 
        <Modal title="Tạo sản phẩm" textBtn2="Tạo" show={show} onHide={onHide} onSubmit={formik.handleSubmit}>
            <div className="payroll-detailItem">
                <div className="payroll-detail-feild">
                    <select id="status" className="payroll-detail-select" value={formik.values.status} onChange={formik.handleChange}>
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
                <div className="payroll-detail-feild">
                    <input id="invoice" className="payroll-detail-input" placeholder="Client" value={formik.values.invoice} onChange={formik.handleChange}/>
                    {formik.errors.invoice && formik.touched.invoice && <span className="payroll-detail-message">{formik.errors.invoice}</span>}
                </div>
            </div>
        </Modal>
     );
}

export default CreateProduct;