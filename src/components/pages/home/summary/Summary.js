import React from 'react'
import './Summary.css'
import { Button } from 'antd'
import banner from '../../../../assets/banner.png'
import achieve1 from '../../../../assets/achieve1.png'
import achieve2 from '../../../../assets/achieve2.png'
import achieve3 from '../../../../assets/achieve3.png'
import achieve4 from '../../../../assets/achieve4.png'


const Summary = () => {
    return (
        <div className="summary">
            <div className="container">
                <div className="row banner-row">
                    <div className="col-6">
                        <div className="banner-left">
                            <div className="banner-left__top">
                                <h1>Learn Without Limits</h1>
                                <p>Build skills with courses, certificates, and degress online from world-class universities and companies</p>
                            </div>
                            <div className="banner-left__bottom">
                                <Button className="banner-btn" href="./login" type="primary">Join for Free</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="banner-right">
                            <img src={banner} alt="" />
                        </div>
                    </div>
                </div>
                <div className="row achieve-row">
                    <h2>Achieve your goals with AStudy</h2>
                    <div className="achieve-wrap">
                        <div className="col-3 achieve-col">
                            <div className="achieve-title">
                                <img src={achieve1} />
                                <span>Learn the latest skills</span>
                            </div>
                            <p className="achieve-detail">like business analytics, graphic design, Python, and more</p>
                        </div>
                        <div className="col-3 achieve-col">
                            <div className="achieve-title">
                                <img src={achieve2} />
                                <span>Get ready for a career</span>
                            </div>
                            <p className="achieve-detail">in high-demand fields like IT, AI and cloud engineering</p>
                        </div>
                        <div className="col-3 achieve-col">
                            <div className="achieve-title">
                                <img src={achieve3} />
                                <span>Earn a degree</span>
                            </div>
                            <p className="achieve-detail">from a leading university in business, computer science, and more</p>
                        </div>
                        <div className="col-3 achieve-col">
                            <div className="achieve-title">
                                <img src={achieve4} />
                                <span>Upskill your organization</span>
                            </div>
                            <p className="achieve-detail">with on-demand training and development programs</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary
