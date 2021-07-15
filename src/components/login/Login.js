import React from 'react'
import './Login.css'
import loginBanner from '../../assets/loginBanner.png'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'

const Login = () => {
    return (
        <div className="login">
            <div className="container">
                <div className="row login-row">
                    <div className="login-wrap">
                        <h1>AStudy - Learn without limits</h1>
                        <div className="login-inner">
                            <div className="inner-left">
                                <img src={loginBanner} />
                                <p>Online teaching and learning support system</p>
                            </div>
                            <div className="inner-right">
                                <h3>Log In</h3>
                                <form>
                                    <label>Email</label>
                                    <div className="input-wrap">
                                        <MailIcon className="input-icon" />
                                        <input type="email" placeholder="name@email.com" required />
                                    </div>
                                    <label>Password</label>
                                    <div className="input-wrap">
                                        <LockIcon className="input-icon" />
                                        <input type="password" placeholder="Enter your password" required />
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
