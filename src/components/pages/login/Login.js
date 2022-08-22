import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { login, getUserProfile } from "../../../features/user/userAction";

import './Login.scss'
import loginBanner from '../../../assets/loginBanner.png'
import { LockFilled, UserOutlined} from '@ant-design/icons'
import { Spin, message, Row, Col } from 'antd';
import { Link } from "react-router-dom"





const Login = ({ history, location }) => {
    // console.log("from: ", location);
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);

    const onSubmit = async (data) => {

        const requestData = {
            username: data.username,
            password: data.password,
        }
            
        try {
            await dispatch(login(requestData))
            await dispatch(getUserProfile());

            if(location.state) history.push(location.state.from.pathname)
            else history.push('/dashbroad');

        } catch (err) {
            console.error("error in login: ", err)
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "login-msg"
            })
        }
        
    }

    return (
        <div className="login">
            <div className="container login-container">
                <div className="row login-row">
                    <div className="login-wrap">
                        <Spin tip="Loading..." spinning={loading}>
                            <h1>AStudy - Learn without limits</h1>
                            <Row className="login-inner" gutter={{xs: 16, sm: 16}}>
                                <Col xs={24} sm={10}>
                                    <div className="inner-left">
                                        <img src={loginBanner} alt=""/>
                                        <p>Online teaching and learning support system</p>
                                    </div>
                                </Col>
                                <Col xs={24} sm={14}>
                                    <div className="inner-right">
                                        <h3>LOG IN</h3>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <label>Username</label>
                                            <div className="input-wrap">
                                                <UserOutlined className="input-icon" />
                                                <input
                                                    id="username"
                                                    name="username" 
                                                    type="text"
                                                    {...register("username", { pattern: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i })}
                                                    required 
                                                />
                                            </div>
                                            {errors.username && <p style={{
                                                textAlign: 'left',
                                                color: 'red'
                                            }}>Vui lòng nhập đúng định dạng</p>}
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
                                </Col>
                            </Row>
                        </Spin>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
