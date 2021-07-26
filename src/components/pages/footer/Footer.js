import React from 'react'
import './Footer.css'
import 'antd/dist/antd.css'
import appleStore from '../../../assets/appleStore.svg'
import googlePlayStore from '../../../assets/googlePlayStore.png'
import { 
    FacebookFilled, 
    LinkedinFilled, 
    TwitterSquareFilled, 
    YoutubeFilled, 
    InstagramFilled } from '@ant-design/icons'


const Footer = () => {
    return (
        <div className="footer">
            <div className="container footer-container">
                <div className="row row-info">
                    <div className="col-6 col-sm-3">
                        <div className="footer-col">
                            <h3>AStudy</h3>
                            <div>
                                <p>About</p>
                                <p>Catalog</p>
                                <p>Leadership</p>
                                <p>Degrees</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="footer-col">
                            <h3>Comunity</h3>
                            <div>
                                <p>About</p>
                                <p>Catalog</p>
                                <p>Leadership</p>
                                <p>Degrees</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="footer-col">
                            <h3>More</h3>
                            <div>
                                <p>About</p>
                                <p>Catalog</p>
                                <p>Leadership</p>
                                <p>Degrees</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="footer-store">
                            <img src={appleStore} alt="" />
                            <img src={googlePlayStore} alt="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="footer-copyright">
                        <div className="col-6 col-lg-3">
                            <div className="copyright">© 2021 AStudy Inc. All rights reserved.</div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="social">
                                <FacebookFilled style={{fontSize: '2rem'}} />
                                <LinkedinFilled style={{fontSize: '2rem'}} />
                                <TwitterSquareFilled style={{fontSize: '2rem'}} />
                                <YoutubeFilled style={{fontSize: '2rem'}} />
                                <InstagramFilled style={{fontSize: '2rem'}} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
