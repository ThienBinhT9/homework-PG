import React, { useState } from "react";
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {IParamsLogin} from '../../../interfaces/auth-interface.ts'
import {REGEX_EMAIL, TEXT_REQUIRE} from '../../../utils/constants.ts'
import { login } from '../../../services/auth-service.ts'
import {RootState} from '../../../redux/store.ts'

import Button from '../../../components/Button/index.tsx'
import LoadingSpinner from '../../../components/Loading/SpinnerLoading.tsx'

function LoginForm() {

    const { isFetching, message } = useSelector((state: RootState) => state.auth.login)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMess, setIsMess] = useState(false)

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:Yup.object({
            email:Yup.string()
            .required(TEXT_REQUIRE)
            .matches(REGEX_EMAIL, "Phải nhập đúng định dạng email"),
            password:Yup.string()
            .required(TEXT_REQUIRE)
        }),
        onSubmit:(values: IParamsLogin) => {
            login(dispatch, navigate, values)
            setIsMess(true)
        }
    })
    

    return ( 
        <div className="auth-form">
            {isFetching && <LoadingSpinner />}
            <div className="auth-form__section">
                <input 
                    type="text"
                    id="email"
                    className="auth-form__input"
                    placeholder="EMAIL" 
                    value={formik.values.email}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setIsMess(false)
                    }}
                />
                {formik.errors.email && formik.touched.email && <span className="auth-form__errMessage">{formik.errors.email}</span>}
            </div>
            <div className="auth-form__section">
                <input 
                    type="password"
                    id="password"
                    className="auth-form__input"
                    placeholder="PASSWORD"
                    value={formik.values.password}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setIsMess(false)
                    }}
                />
                {formik.errors.password && formik.touched.password && <span className="auth-form__errMessage">{formik.errors.password}</span>}
            </div>
            <p className="auth-form__forgot">FORGOT YOUR PASSWORD</p>
            {message && isMess && <p className="auth-form__mes-server">{message}</p>}
            <div className="auth-form-btns">
                <Button className="auth-form-btn" text="REGISTER" to="/register"/>
                <Button className="auth-form-btn auth-form-btn__active" text="SIGN IN" onClick={formik.handleSubmit}/>
            </div>
        </div>
    );
}

export default LoginForm;