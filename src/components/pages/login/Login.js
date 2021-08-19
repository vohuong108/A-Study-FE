import React from 'react'
import './Login.scss'
import 'antd/dist/antd.css';
import loginBanner from '../../../assets/loginBanner.png'
import { LockFilled, MailFilled} from '@ant-design/icons'
import { Spin, message } from 'antd';
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../../utils/localStorageHandler'
import { login, getUserByToken } from "../../../features/authentication/userAction"
import { unwrapResult } from '@reduxjs/toolkit'




const Login = ({ history, location }) => {
    console.log("from: ", location);
    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);

    const onSubmit = async (data) => {

        const requestData = {
            email: data.email,
            password: data.password,

        }
            
        try {
            const login_res = await dispatch(login(requestData))
            const un_login_res = unwrapResult(login_res);
            setToken(un_login_res.access_token);
            
            const profile = await dispatch(getUserByToken(un_login_res.access_token))

            if(location.state) history.push(location.state.from.pathname)
            else history.push('/dashbroad');

        } catch (err) {
            console.error("error in login: ", err)
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "enroll-msg"
            })
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
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <label>Email</label>
                                        <div className="input-wrap">
                                            <MailFilled className="input-icon" />
                                            <input
                                                id="email"
                                                name="email" 
                                                type="email"
                                                placeholder="name@email.com" 
                                                {...register("email")}
                                                required 
                                            />
                                        </div>
                                        <label>Password</label>
                                        <div className="input-wrap">
                                            <LockFilled className="input-icon" />
                                            <input 
                                                name="password" 
                                                type="password"
                                                placeholder="Enter your password" 
                                                {...register("password")}
                                                required 
                                            />
                                        </div>

                                        <div className="form-btn">
                                            <input className="submit-btn" type="submit" value="Log In"></input>
                                        </div>
                                        
                                            
                                        
                                    </form>
                                    <Link to="/help">
                                        Forgot your password?
                                    </Link>
                                    
                                    <p>
                                        Don't have an account?&nbsp; 
                                        <Link to="/signup">
                                            Sign up
                                        </Link>
                                    </p>
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
