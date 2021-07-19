import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../utils/common'
import { useHistory } from "react-router-dom"
import { addUser } from "../../../stores/reducers/userSlice"
import { unwrapResult } from '@reduxjs/toolkit'

import './SignUp.scss'
import { Checkbox } from 'antd';
import { LockFilled, MailFilled, UserOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';
import loginBanner from '../../../assets/loginBanner.png'


const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        checkbox: false,
    })

    const dispatch = useDispatch();
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'post',
            url: 'http://192.168.0.190:3000/signup/',
            data: {
                username: 'user_1',
                email: 'example@gmail.com',
                password: '12345678',
                checkbox: true
            }
            
        }

        try {
            const resultAction = await dispatch(addUser(requestOptions))
            const result = unwrapResult(resultAction);
            setToken("token_12345");
            history.push('/course');

        } catch (error) {

        }
    }

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
                                    <label>Full Name</label>
                                    <div className="input-wrap">
                                        <UserOutlined className="input-icon" />
                                        <input 
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
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
                                            placeholder="Enter your password" 
                                            required 
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
