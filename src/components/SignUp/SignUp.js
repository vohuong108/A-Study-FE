import React from 'react'
import './SignUp.scss'
import loginBanner from '../../assets/loginBanner.png'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person';
import Checkbox from '@material-ui/core/Checkbox';

const SignUp = () => {

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
                                <form>
                                    <label>Full Name</label>
                                    <div className="input-wrap">
                                        <PersonIcon className="input-icon" />
                                        <input type="text" placeholder="Cristiano Ronado" required />
                                    </div>
                                    <label>Email</label>
                                    <div className="input-wrap">
                                        <MailIcon className="input-icon" />
                                        <input type="email" placeholder="cr7@gmail.com" required />
                                    </div>
                                    <label>Password</label>
                                    <div className="input-wrap">
                                        <LockIcon className="input-icon" />
                                        <input type="password" placeholder="Enter your password" required />
                                    </div>
                                    <div className="form-license">
                                        <Checkbox className="checkbox-btn"/>
                                        <p>Yes! I want to get the most out of AStudy by receiving emails with exclusive deals, personal recommendations and learning tips!</p>
                                    </div>
                                    <div className="form-btn">
                                        <input className="submit-btn" type="submit" value="Sign Up"></input>
                                    </div>
                                </form>
                                <p>Already have an account? <a href="">Sign up</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default SignUp
