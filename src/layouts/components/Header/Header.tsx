import React from 'react'
import Tippy from '@tippyjs/react/headless'
import { useDispatch, useSelector } from 'react-redux' 

import './Header.scss'
import {logout} from '../../../services/auth-service.ts'
import { RootState } from '../../../redux/store.ts'

import Button from '../../../components/Button/index.tsx'

function Header() {

    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.user.user)

    const handleLogout = () => {
        logout(dispatch)
    }

    return ( 
        <div className='wrapper-header'>
            <div className='inner-header'>
                <div className='inner-header-right'>
                    <p className='inner-header-name'>{user.name}</p>
                    <Tippy
                        render={attrs => (
                            <div className="wrapper-tippy-content" tabIndex={-1} {...attrs}>
                                <Button to='/profile' className="nav-btn" text='Profile'/>
                                <Button to='/payroll' className="nav-btn" text='Payroll'/>
                                <Button onClick={handleLogout} className="nav-btn" text='Đăng xuất'/>
                            </div>
                        )}
                        trigger='click' 
                        interactive={true}
                        placement='bottom-end'
                        offset={[20, 12]}
                    >
                        <div className='inner-header-avatar'>
                            <img src="https://i.pinimg.com/236x/0e/32/18/0e3218732bbbe26aec6458893ed862ac.jpg" alt='avatar'/>
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default Header;