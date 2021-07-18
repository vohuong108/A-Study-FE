import React, { useState, useEffect } from 'react'
import setAuthorizationHeader from '../../utils/setAuthorizationHeader'
import axios from 'axios'
import './Login.scss'
import loginBanner from '../../assets/loginBanner.png'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import { setUserSession } from '../../utils/common.js'
import { useHistory } from "react-router-dom";


const Login = (props) => {
    let history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const url = 'http://192.168.0.190:3000/login/';
        const requestOptions = {
            method: 'post',
            url: url,
            data: {
                username: 'user_1',
                password: '12345678'
            }
            
        }

        setUserSession("token", null);
        history.push('/course');
        // try {
        //     const response = await axios(requestOptions);
        //     setLoading(false);
        //     setUserSession(response.data.access_token, null);
        //     props.history.push('/course');
        // } catch (e) {

        // }
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row login-row">
                    <div className="login-wrap">
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
                                        <MailIcon className="input-icon" />
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
                                        <LockIcon className="input-icon" />
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
                                <p>Don't have an account? <a href="">Sign up</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
