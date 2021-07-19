import React from 'react'
import './Header.css'
import 'antd/dist/antd.css';
import Logo from '../../../assets/logo.png'
import { Button } from 'antd';
import Categories from './category/Categories.js'
import Search from './Search/Search.js'
import HeaderCart from './headerCart/HeaderCart';
import UserAvatar from './avatar/UserAvatar';
import NotifyBell from './notify/NotifyBell';

const Header = () => {
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
                        {false 
                            ? <div className="header-right__btn">
                                <Button href="/login" className="header-btn" danger >Login</Button>
                                <Button href="/sigup" className="header-btn" type="primary">Sign Up</Button>

                            </div>
                            : <div className="header-right__user">
                                <NotifyBell />
                                <UserAvatar />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
