import React, { useEffect } from 'react'
import './Header.css'
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectUser } from '../../../features/authentication/userSlice'
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
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    console.log('userObj: ', user)

    useEffect(() => {
        console.log('run in effect header')
        const getUser = async () => {
            console.log('run in asyn header')

            const resultAction = await dispatch(getUserByToken(getToken()))
            const result = unwrapResult(resultAction);

            console.log('unwrap result in header: ', result);
        }

        if(!user && getToken()) {
            getUser()
        }
        
    }, [])

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-row">
                    <div className="header-left">
                        <div className="header-logo">
                            <a href='/'>
                                <img className="logo-img" src={Logo} alt="logo" />
                            </a>
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
                                <UserAvatar avtURL={user.avatarURL} />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
