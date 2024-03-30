import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {useDispatch, useSelector} from 'react-redux'

import { IParamsRegister } from '../../../interfaces/auth-interface.ts'
import { ILocationParams } from '../../../interfaces/common-interface.ts'
import { renderGender, renderLocation } from '../../../utils/method.tsx'
import { getLocation } from '../../../services/location-service.ts'
import { register } from '../../../services/auth-service.ts'
import { RootState } from '../../../redux/store.ts'
import {
    REGEX_EMAIL, TEXT_REQUIRE, TEXT_EMAIL, TEXT_MIN_NAME,
    TEXT_MIN_PASS, TEXT_MAX_PASS, TEXT_REAPEAT_PASS,TEXT_MAX_NAME,
} from '../../../utils/constants.ts'

import Button from '../../../components/Button/index.tsx'
import LoadingSpinner from '../../../components/Loading/SpinnerLoading.tsx'

function RegisterForm() {

    const {isFetching, message} = useSelector((state: RootState) => state.auth.register)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [region, setRegion] = useState<ILocationParams[]>([])
    const [city, setCity] = useState<ILocationParams[]>([])
    const [isMess, setIsMess] = useState(false)

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            repeatPassword:"",
            name: "",
            gender:"gender",
            region:"region",
            state:"state"
        },
        validationSchema:Yup.object({
            email:Yup.string()
            .required(TEXT_REQUIRE)
            .matches(REGEX_EMAIL, TEXT_EMAIL),
            password:Yup.string()
            .required(TEXT_REQUIRE)
            .min(6, TEXT_MIN_PASS)
            .max(12, TEXT_MAX_PASS),
            repeatPassword:Yup.string()
            .required(TEXT_REQUIRE)
            .oneOf([Yup.ref('password')], TEXT_REAPEAT_PASS),
            name:Yup.string()
            .required(TEXT_REQUIRE)
            .min(6, TEXT_MIN_NAME)
            .max(50, TEXT_MAX_NAME),
            gender:Yup.string()
            .notOneOf(['gender'], TEXT_REQUIRE),
            state:Yup.string()
            .notOneOf(["state"], TEXT_REQUIRE),
            region:Yup.string()
            .notOneOf(["region"], TEXT_REQUIRE),
        }),
        onSubmit:(values: IParamsRegister) => {
            register(dispatch, navigate, values)
            setIsMess(true)
        }
    })

    const handleChangeRegion = async(e) => {
        formik.handleChange(e)
        const _city = await getLocation({id:e.target.value})
        setCity(_city)
        setIsMess(false)
    }

    useEffect(() => {
        
        const callApiLocation = async() => {
            const region = await getLocation({})
            setRegion(region)
        }
        callApiLocation()
    },[])
    

    
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
                    onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && <span className="auth-form__errMessage">{formik.errors.email}</span>}
            </div>
            <div className="auth-form__section">
                <input 
                    type="text"
                    id="name"
                    className="auth-form__input"
                    placeholder="NAME"
                    value={formik.values.name}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setIsMess(false)
                    }}
                />
                {formik.errors.name && formik.touched.name && <span className="auth-form__errMessage">{formik.errors.name}</span>}

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
            <div className="auth-form__section">
                <input 
                    type="password"
                    id="repeatPassword"
                    className="auth-form__input"
                    placeholder="CONFIRM PASSWORD"
                    value={formik.values.repeatPassword}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setIsMess(false)
                    }}
                />
                {formik.errors.repeatPassword && formik.touched.repeatPassword && <span className="auth-form__errMessage">{formik.errors.repeatPassword}</span>}
            </div>
            <div className="auth-form__section">
                <select 
                    id="gender" 
                    className="auth-form__select"
                    value={formik.values.gender}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setIsMess(false)
                    }}
                >
                    {renderGender({text:"GENDER"})}
                </select>
                {formik.errors.gender && formik.touched.gender && <span className="auth-form__errMessage">{formik.errors.gender}</span>}
            </div>
            <div className="auth-form__section">
                <select 
                    id="region" 
                    className="auth-form__select"
                    value={formik.values.region}
                    onChange={handleChangeRegion}
                >
                    {renderLocation({locations:region, text:"REGION"})}
                </select>
                {formik.errors.region && formik.touched.region && <span className="auth-form__errMessage">{formik.errors.region}</span>}
            </div>
            <div className="auth-form__section">
                <select 
                    id="state" 
                    className="auth-form__select"
                    value={formik.values.state}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setIsMess(false)
                    }}
                >
                    {renderLocation({locations:city, text:"STATE"})}
                </select>
                {formik.errors.state && formik.touched.state && <span className="auth-form__errMessage">{formik.errors.state}</span>}
            </div>
            {message && isMess && <p className="auth-form__mes-server">{message}</p>}
            <div className="auth-form-btns">
                <Button className="auth-form-btn" text="LOGIN" to="/login"/>
                <Button className="auth-form-btn auth-form-btn__active" text="SIGN UP" onClick={formik.handleSubmit}/>
            </div>
        </div>
    );
}

export default RegisterForm;