import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from "react-router-dom"
import { registing } from "../../../features/authentication/asyncThunkAction"
import { unwrapResult } from '@reduxjs/toolkit'
import { useForm } from "react-hook-form"

import './SignUp.scss'
import { Checkbox } from 'antd';
import { LockFilled, MailFilled, UserOutlined} from '@ant-design/icons'
import { message } from 'antd';
import 'antd/dist/antd.css';
import loginBanner from '../../../assets/loginBanner.png'


const SignUp = () => {
    const dispatch = useDispatch();
    const registed = useSelector(state => state.user.registed);
    let history = useHistory();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const requestData = {
            username: data.username,
            email: data.email,
            password: data.password,
            checkbox: data.checkbox,
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
                                <form onSubmit={(e) => handleSubmit(onSubmit)}>
                                    <label>Username</label>
                                    <div className="input-wrap">
                                        <UserOutlined className="input-icon" />
                                        <input 
                                            id="username"
                                            type="text"
                                            placeholder="Cristiano Ronado" 
                                            {...register("username")}
                                            required 
                                        />
                                    </div>
                                    <label>Email</label>
                                    <div className="input-wrap">
                                        <MailFilled className="input-icon" />
                                        <input 
                                            id="email"
                                            type="email" 
                                            placeholder="cr7@gmail.com" 
                                            {...register("email")}
                                            required 
                                        />
                                    </div>
                                    <label>Password</label>
                                    <div className="input-wrap">
                                        <LockFilled className="input-icon" />
                                        <input 
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password" 
                                            pattern=".{8,}" 
                                            title="8 characters minimum"
                                            {...register("password")}
                                            required 
                                        />
                                    </div>
                                    <div className="form-license">
                                        <Checkbox 
                                            id="checkbox"
                                            className="checkbox-btn" 
                                            {...register("checkbox")}
                                        />
                                        <p>Yes! I want to get the most out of AStudy by receiving emails with exclusive deals, personal recommendations and learning tips!</p>
                                    </div>
                                    <div className="form-btn">
                                        <input className="submit-btn" type="submit" value="Sign Up"></input>
                                    </div>
                                </form>
                                <p>
                                    Already have an account?&nbsp;
                                    <Link to="/login">Log In</Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default SignUp
