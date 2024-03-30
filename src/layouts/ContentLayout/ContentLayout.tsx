import React from 'react'

import './ContentLayout.scss'

function ContentLayout({children}) {
    return ( 
        <div className='wrapper-contentLayout'>
            {children}
        </div>
    );
}

export default ContentLayout;