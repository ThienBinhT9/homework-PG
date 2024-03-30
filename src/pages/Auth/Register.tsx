import React from "react";

import RegisterForm from "./components/RegisterForm.tsx";

import './Auth.scss'

function Register() {
    return ( 
        <div className="wrapper-auth">
            <div className="inner-auth">
                <h1 className="inner-auth-header">REGISTER</h1>
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;