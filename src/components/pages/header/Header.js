import React, { useEffect, useState } from 'react'
import './Header.scss'
import 'antd/dist/antd.css'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { getUserByToken, getCategory } from '../../../features/authentication/userAction'
import { getToken, removeToken } from '../../../utils/localStorageHandler'
import Logo from '../../../assets/logo.png'
import { Button, Drawer, Input, Avatar, Divider, Menu } from 'antd'
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import Categories from './category/Categories'
import Search from './Search/Search'
import HeaderCart from './headerCart/HeaderCart'
import UserAvatar from './avatar/UserAvatar'
import NotifyBell from './notify/NotifyBell'
import { Link, useHistory } from 'react-router-dom'
import { logOut } from '../../../features/authentication/userSlice'


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
                        <MenuDrawerLeft />
                        <div className="logo-wrap left-logo">
                            <Link to='/'>
                                <img className="logo-img" src={Logo} alt="logo" />
                            </Link>
                        </div>
                        <Categories />
                    </div>
                    <div className="header-middle">
                        <div className="logo-wrap middle-logo">
                            <Link to='/'>
                                <img className="logo-img" src={Logo} alt="logo" />
                            </Link>
                        </div>
                        <Search />
                    </div>
                    <div className="header-right">
                        {/* <HeaderCart /> */}
                        {!user 
                            ? <div className="header-right__btn">
                                <Link to="/login">
                                    <Button className="header-btn" danger shape="round" >Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="header-btn" type="primary" shape="round">Sign Up</Button>
                                </Link>
                            </div>
                            : <div className="header-right__user">
                                <NotifyBell />
                                <UserAvatar />
                            </div>
                        }
                        <SearchRight />
                        
                    </div>
                </div>
            </div>
        </header>
    )
}


const MenuDrawerLeft = () => {
    const [visible, setVisible] = useState(false);
    const user = useSelector(state => state.user.userObj);
    const categories = useSelector(state => state.user.category);
    const dispatch = useDispatch();
    let history = useHistory();

    const handleLogOut = () => {
        console.log("in here")
        dispatch(logOut());
        removeToken();
        
        history.push('/')
        //TODO: RELOAD PAGE
    }

    const handleClick = ({ key}) => {
        console.log("key: ", key);
        if(key) {
            let query = key.split(" ").join("+");
            history.push(`/search/?q=${query}`);
        }
    }

    return (
        <React.Fragment>
            <Button 
                className="btn-responsive btn-menu" 
                icon={<MenuOutlined />} 
                onClick={() => setVisible(true)}
            />
            <Drawer
                className="menu-drawer"
                title="Basic Drawer"
                closable={false}
                placement="left"
                onClose={() => setVisible(!visible)}
                visible={visible}
                headerStyle={{display: 'none'}}
            >
                <div className="menu-drawer-wrap">
                    {user 
                        ? <React.Fragment>
                            <div className="user-info">
                                <Link to="/" className="account-info">
                                    <Avatar 
                                        size={64} 
                                        className="avt-user"
                                        src={user?.avatar}
                                    />
                                    <div className="account-detail">
                                        <p>{user?.userName}</p>
                                        <p>{user?.email}</p>
                                    </div>
                                </Link>
    
                            </div>
                            <div className="menu-features">
                                <ul>
                                    <li><Link to="/dashbroad">My Course</Link></li>
                                    <li><Link to="/profile">My Profile</Link></li>
                                    <li onClick={handleLogOut}>Log out</li>
                                </ul>
                            </div>
                            <Divider className="menu-drawer-divider"/>
                        </React.Fragment>
                        : <div className="menu-user-yet-login">
                            <ul>
                                <li><Link to="/login">Log in</Link></li>
                                <li><Link to="/signup">Sign up</Link></li>
                            </ul>
                        </div>
                         
                    }
                    <Divider className="menu-drawer-divider"/>
                    
                    <div className="menu-drawer-category">
                        <Menu style={{ width: 256 }} className="ctg-menu" onClick={handleClick} selectedKeys={[]}>
                            {categories && categories.map(ctg => 
                                <Menu.Item key={ctg.name}>{ctg.name}</Menu.Item>
                            )}
                        </Menu>
                    </div>
                </div>
            </Drawer>
        </React.Fragment>
    )
}

const SearchRight = () => {
    const [visible, setVisible] = useState(false);
    const history = useHistory();

    const handleSearch = (e) => {
        if(e.trim() !== '') {
            let query = e.trim().split(" ").join("+");
            console.log("query: ", query.length);
            history.push(`/search/?q=${query}`);
            setVisible(false);

        }
    }
    return (
        <React.Fragment>
            <Button 
                className="btn-responsive right-btn-search" 
                icon={<SearchOutlined />} 
                onClick={() => setVisible(true)} 
            />
            <Drawer
                className="search-drawer"
                title="Search everything"
                placement="top"
                onClose={() => setVisible(!visible)}
                visible={visible}
            >
                <div className="wrap-input">
                    <Input.Search 
                        className="search-input" 
                        placeholder="Enter search text" 
                        enterButton
                        onSearch={(value) => handleSearch(value)}
                    />
                </div>
                
            </Drawer>
        </React.Fragment>
    )
}

export default Header
