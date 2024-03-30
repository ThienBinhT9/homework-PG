import React from "react";

import './Loading.scss'

function BlurredLoading() {
    return ( 
        <div className="wrapper-loadingblurred">
            <div className="loadingblurred__avatar">
                <p className="loadingblurred__run"></p>
            </div>
            <div className="loadingblurred__info">
                <div className="loadingblurred__name">
                    <p className="loadingblurred__run"></p>
                </div>
                <div className="loadingblurred__desc">
                    <p className="loadingblurred__run"></p>
                </div>
            </div>
        </div>
     );
}

export default BlurredLoading;