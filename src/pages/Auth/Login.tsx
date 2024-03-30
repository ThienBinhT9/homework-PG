import React from "react";

import LoginForm from "./components/LoginForm.tsx";

import './Auth.scss'

function Register() {
    return ( 
        <div className="wrapper-auth">
            <div className="inner-auth">
                <h1 className="inner-auth-header">SIGN IN</h1>
                <LoginForm />
            </div>
        </div>
    );
}

export default Register;