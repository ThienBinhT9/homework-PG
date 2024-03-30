import React, { useEffect } from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import {RootState} from '../../redux/store.ts'
import {isObjectEmpty} from '../../utils/method.tsx'
import { getProfileUser } from '../../services/user-service.ts'

import FeildEdit from './components/FeildEdit.tsx'
import Button from '../../components/Button/index.tsx'
import LoadingBlurred from '../../components/Loading/BluredLoading.tsx'
import Avatar from './components/Avatar.tsx'

import './Profile.scss'

function Profile() {

    const {user, getProfile, updateAvatar} = useSelector((state:RootState) => state.user)
    const token = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email:"",
            name:"",
            description:"",
            state:"",
        },
        validationSchema:Yup.object({
            email:Yup.string()
            .notOneOf([user.email], "Email không được giống cũ"),
            name:Yup.string()
            .notOneOf([user.name], "Tên không được giống cũ"),
            description:Yup.string()
            .notOneOf([user.description], "Mô tả không được giống cũ"),
            state:Yup.string()
            .notOneOf([user.state], "Nơi sống không được giống cũ"),

        }),
        onSubmit:(values) => {
            console.log(values);
        }
    })

    useEffect(() => {
        if(isObjectEmpty(user)){
            getProfileUser(dispatch, token)
        }
    },[user, dispatch, token])

    return ( 
        <div className='wrapper-profile'>
            <div className='inner-profile'>
                {(getProfile.isFetching || updateAvatar.isFetching) && <LoadingBlurred />}
                <Avatar initAvatar={user.avatar}/>
                <div className='profile-info'>
                    <FeildEdit feiled="Email" initValue={user.email} value={formik.values.email} handleChange={formik.handleChange}/>
                    <FeildEdit feiled='Name' initValue={user.name} value={formik.values.name} handleChange={formik.handleChange}/>
                    <FeildEdit feiled='Description' initValue={user.description} value={formik.values.description} handleChange={formik.handleChange}/>
                    <FeildEdit feiled='Region' initValue={user.region} value={formik.values.description} handleChange={formik.handleChange}/>
                    <FeildEdit feiled='State' initValue={user.state} value={formik.values.state} handleChange={formik.handleChange}/>

                    <div className='profile-edit-btns'>
                        <Button text='Clear'/>
                        <Button text='Update'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;