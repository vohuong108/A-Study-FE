import React, { useState } from 'react'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import './UserAvatar.scss'

const UserAvatar = () => {
    const [isHover, setHover] = useState(false);

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
                icon={<UserOutlined />}
            />
            <div className={`avt-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                <div className="avt-pop">
                    <div className="pop-container">
                        <a className="account-info">
                            <Avatar size={64} icon={<UserOutlined/>} className="avt-user"/>
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
                            <li>
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
