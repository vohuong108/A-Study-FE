import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../../features/authentication/userSlice'
import { removeToken } from '../../../../utils/localStorageHandler'
import { Avatar } from 'antd'
import { useHistory, Link } from "react-router-dom"
import 'antd/dist/antd.css'
import './UserAvatar.scss'

const UserAvatar = () => {
    const [isHover, setHover] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);
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
                src={user?.avatar}
            />
            <div className={`avt-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                <div className="avt-pop">
                    <div className="pop-container">
                        <a className="account-info">
                            <Avatar 
                                size={64} 
                                className="avt-user"
                                src={user?.avatar}
                            />
                            <div className="account-detail">
                                <p>{user?.userName}</p>
                                <p>{user?.email}</p>
                            </div>
                        </a>
                        <ul className="list-menu">
                            {user.permission == "ADMIN" && <li><Link to="/admin">Admin page</Link></li>}
                            <li>
                                <Link to="/dashbroad">My Courses</Link>
                            </li>
                            <li>
                                <Link to="/profile">My Profile</Link>
                            </li>
                        </ul>
                        <ul className="list-menu">
                            
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
