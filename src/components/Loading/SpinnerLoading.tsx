import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

import './Loading.scss'

function LoadingSpinner() {
    return ( 
        <div className="wrapper-loading">
            <FontAwesomeIcon className="loading__icon" icon={faSpinner} />
        </div>
     );
}

export default LoadingSpinner;