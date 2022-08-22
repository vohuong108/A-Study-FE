import React from 'react';
import { signup } from "../../../features/user/userAction";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import { LockFilled, MailFilled, UserOutlined} from '@ant-design/icons';
import { Spin, Checkbox, Row, Col, message } from 'antd';

import './SignUp.scss';
import 'antd/dist/antd.css';
import loginBanner from '../../../assets/loginBanner.png';



const SignUp = ({ history }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const loading = useSelector(state => state.user.loading);

    const onSubmit = async (data) => {

        const result = await dispatch(signup({
            username: data.username,
            email: data.email,
            password: data.password,
            checkbox: data.checkbox,
        }))

        console.log("result signup: ", result);

        if(result?.error) {
            message.error({
                content: result.payload.message,
                style: {marginTop: '72px'},
                key: "signup-msg"
            })
        } else {
            message.success({
                content: 'Register Successfull. Please verify your email!',
                className: 'custom-class',
                style: {marginTop: '15vh'},
            })
            history.push('/login');
        }

    }

    return (
        <div className="signup">
            <div className="signup-container container">
                <div className="row signup-row">
                    <div className="signup-wrap">
                        <Spin tip="Loading..." spinning={loading}>
                            <h1>AStudy - Learn without limits</h1>
                            <Row className="signup-inner" gutter={{xs: 16, sm: 16}}>
                            <Col xs={24} sm={10}>
                                <div className="inner-left">
                                    <img src={loginBanner} alt=""/>
                                    <p>Online teaching and learning support system</p>
                                </div>
                            </Col>
                            <Col xs={24} sm={14}>
                                <div className="inner-right">
                                    <h3>SIGN UP</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            </Col>
                        </Row>
                        </Spin>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default SignUp
