import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../../utils/localStorageHandler'
import { useHistory } from "react-router-dom"
import { login, getUserByToken } from "../../../features/authentication/asyncThunkAction"
import { unwrapResult } from '@reduxjs/toolkit'

import './Login.scss'
import loginBanner from '../../../assets/loginBanner.png'
import { LockFilled, MailFilled} from '@ant-design/icons'
import { Spin } from 'antd';
import 'antd/dist/antd.css';


const Login = (props) => {
    let history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requestData = {
            // email: formData.email,
            // password: formData.password
            username: 'user_1',
            password: '12345678'
        }
            
        try {
            const access_token = await dispatch(login(requestData))
            const un_access_token = unwrapResult(access_token);
            setToken(un_access_token);
            console.log("unwrapResult in login", un_access_token)
            
            // setAuthHeader(un_access_token);
            const profile = await dispatch(getUserByToken(un_access_token))
            const un_profile = unwrapResult(profile);
            console.log("unwrapResult in profile", un_profile)
            history.push('/dashbroad');

        } catch (error) {
            console.error("error in login: ", error)
        }
        
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row login-row">
                
                    <div className="login-wrap">
                        <Spin tip="Loading..." spinning={loading}>
                            <h1>AStudy - Learn without limits</h1>
                            <div className="login-inner">
                                <div className="inner-left">
                                    <img src={loginBanner} alt=""/>
                                    <p>Online teaching and learning support system</p>
                                </div>
                                <div className="inner-right">
                                    <h3>LOG IN</h3>
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <label>Email</label>
                                        <div className="input-wrap">
                                            <MailFilled className="input-icon" />
                                            <input 
                                                name="email" 
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="name@email.com" 
                                                required 
                                            />
                                        </div>
                                        <label>Password</label>
                                        <div className="input-wrap">
                                            <LockFilled className="input-icon" />
                                            <input 
                                                name="password" 
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                placeholder="Enter your password" 
                                                required 
                                            />
                                        </div>

                                        <div className="form-btn">
                                            <input className="submit-btn" type="submit" value="Log In"></input>
                                        </div>
                                        
                                            
                                        
                                    </form>
                                    <a href="">Forgot your password?</a>
                                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                                </div>
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
