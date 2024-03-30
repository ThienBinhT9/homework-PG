import React from "react";
import classnames from 'classnames/bind'
import { Link } from "react-router-dom";

import styles from './Button.module.scss'

const cx = classnames.bind(styles)

interface Props{
    onClick?:(values:any) => void,
    text:string,
    to?:string,
    primary?:boolean,
    disabled?:boolean,
    className?: any
}

function Button(props: Props) {
    const {to = false, text, onClick, primary, disabled, className, ...passProps} = props

    const _props = {
        onClick,
        ...passProps
    }

    const classes = cx({
        "wrapper":true,
        [className]:className,
        primary,
        disabled
    })

    return ( 
        <>
            {to ? (
                <Link to={to} className={classes} {..._props}>{text}</Link>
            ) : (
                <p className={classes} {..._props}>{text}</p>
            )}
        </>
     );
}

export default Button;