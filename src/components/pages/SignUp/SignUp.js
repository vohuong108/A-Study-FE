import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { registing } from "../../../features/authentication/asyncThunkAction"
import { unwrapResult } from '@reduxjs/toolkit'

import './SignUp.scss'
import { Checkbox } from 'antd';
import { LockFilled, MailFilled, UserOutlined} from '@ant-design/icons'
import { message } from 'antd';
import 'antd/dist/antd.css';
import loginBanner from '../../../assets/loginBanner.png'


const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        checkbox: false,
    })

    const dispatch = useDispatch();
    const registed = useSelector(state => state.user.registed);
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const requestData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                checkbox: true
        }

        try {
            const resultAction = await dispatch(registing(requestData))
            const result = unwrapResult(resultAction);


            // history.push('/login');

        } catch (error) {

        }
    }

    useEffect(() => {
        if(registed) message.success({
            content: 'Register Successfull. Please verify your email!',
            className: 'custom-class',
            style: {marginTop: '15vh'},
          })
    }, [registed])

    return (
        <div className="signup">
            <div className="container">
                <div className="row signup-row">
                    <div className="signup-wrap">
                        <h1>AStudy - Learn without limits</h1>

                        <div className="signup-inner">
                            <div className="inner-left">
                                <img src={loginBanner} alt=""/>
                                <p>Online teaching and learning support system</p>
                            </div>
                            <div className="inner-right">
                                <h3>SIGN UP</h3>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <label>Username</label>
                                    <div className="input-wrap">
                                        <UserOutlined className="input-icon" />
                                        <input 
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                            placeholder="Cristiano Ronado" 
                                            required 
                                        />
                                    </div>
                                    <label>Email</label>
                                    <div className="input-wrap">
                                        <MailFilled className="input-icon" />
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="cr7@gmail.com" 
                                            required 
                                        />
                                    </div>
                                    <label>Password</label>
                                    <div className="input-wrap">
                                        <LockFilled className="input-icon" />
                                        <input 
                                            type="password"
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            placeholder="Enter your password" 
                                            required 
                                            pattern=".{8,}" 
                                            title="8 characters minimum"
                                        />
                                    </div>
                                    <div className="form-license">
                                        <Checkbox 
                                            className="checkbox-btn" 
                                            onChange={(e) => setFormData({...formData, checkbox: e.target.checked})}
                                        />
                                        <p>Yes! I want to get the most out of AStudy by receiving emails with exclusive deals, personal recommendations and learning tips!</p>
                                    </div>
                                    <div className="form-btn">
                                        <input className="submit-btn" type="submit" value="Sign Up"></input>
                                    </div>
                                </form>
                                <p>Already have an account? <a href="/login">Log In</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default SignUp
