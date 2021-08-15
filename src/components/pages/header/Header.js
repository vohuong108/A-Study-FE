import React, { useEffect } from 'react'
import './Header.css'
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { getUserByToken } from '../../../features/authentication/asyncThunkAction'
import { getToken } from '../../../utils/localStorageHandler'
import Logo from '../../../assets/logo.png'
import { Button } from 'antd';
import Categories from './category/Categories'
import Search from './Search/Search'
import HeaderCart from './headerCart/HeaderCart';
import UserAvatar from './avatar/UserAvatar';
import NotifyBell from './notify/NotifyBell';
import { Link } from 'react-router-dom'

const Header = () => {
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = getToken();

        const getUser = async (token) => {
            const resultAction = await dispatch(getUserByToken(token))
            const result = unwrapResult(resultAction);
        }

        if(!user && token) {
            getUser()
        }
        
    }, [])

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-row">
                    <div className="header-left">
                        <div className="header-logo">
                            <Link to='/'>
                                <img className="logo-img" src={Logo} alt="logo" />
                            </Link>
                        </div>
                        <Categories />
                    </div>
                    <Search />
                    <div className="header-right">
                        <HeaderCart />
                        {!user 
                            ? <div className="header-right__btn">
                                <Link to="/login">
                                    <Button className="header-btn" danger >Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="header-btn" type="primary">Sign Up</Button>
                                </Link>
                            </div>
                            : <div className="header-right__user">
                                <NotifyBell />
                                <UserAvatar avtURL={user.avatar} />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
