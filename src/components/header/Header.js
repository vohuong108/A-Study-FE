import React from 'react'
import Logo from '../../assets/logo.png'
import Button from '@material-ui/core/Button'
import Categories from './category/Categories.js'
import Search from './Search/Search.js'
import './Header.css'
import HeaderCart from './headerCart/HeaderCart';

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
                        <div className="header-right__btn">
                            <Button className="header-btn" variant="outlined" color="secondary">Login</Button>
                            <Button className="header-btn" variant="contained" color="primary">Sign Up</Button>

                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
