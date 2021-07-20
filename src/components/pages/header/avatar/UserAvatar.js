import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../../features/authentication/userSlice'
import { removeToken } from '../../../../utils/localStorageHandler'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom"
import 'antd/dist/antd.css'
import './UserAvatar.scss'

const UserAvatar = ({ avtURL }) => {
    const [isHover, setHover] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();
    
    const handleLogOut = () => {
        dispatch(logOut());
        removeToken();
        
        history.push('/')
        //TODO: RELOAD PAGE
    }

    return (
        <div 
            className="user-avatar" 
            style={{ paddingLeft: '1.2rem', display: 'flex', alignItems: 'center'}}
            onMouseMove={() => isHover === false ? setHover(true) : ''} 
            onMouseLeave={() => setHover(false)}
        >
            <Avatar
                style={{
                    backgroundColor: '#87d068',
                }}
                // icon={<UserOutlined />}
                src={avtURL}
            />
            <div className={`avt-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                <div className="avt-pop">
                    <div className="pop-container">
                        <a className="account-info">
                            <Avatar 
                                size={64} 
                                className="avt-user"
                                src={avtURL}
                            />
                            <div className="account-detail">
                                <p>username</p>
                                <p>email@gmail.com</p>
                            </div>
                        </a>
                        <ul className="list-menu">
                            <li>
                                <a>My Learning</a>
                            </li>
                            <li>
                                <a>My Cart</a>
                            </li>
                        </ul>
                        <ul className="list-menu">
                            <li>
                                <a>My Profile</a>
                            </li>
                            <li onClick={() => handleLogOut()}>
                                <a>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAvatar
