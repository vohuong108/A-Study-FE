import React from 'react'
import './Footer.css'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import InstagramIcon from '@material-ui/icons/Instagram'
import appleStore from '../../assets/appleStore.svg'
import googlePlayStore from '../../assets/googlePlayStore.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container footer-container">
                <div className="row row-info">
                    <div className="col-3">
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
                    <div className="col-3">
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
                    <div className="col-3">
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
                    <div className="col-3">
                        <div className="footer-store">
                            <img src={appleStore} alt="" />
                            <img src={googlePlayStore} alt="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="footer-copyright">
                        <div className="col-3">
                            <div className="copyright">© 2021 AStudy Inc. All rights reserved.</div>
                        </div>
                        <div className="col-3">
                            <div className="social">
                                <FacebookIcon />
                                <LinkedInIcon />
                                <TwitterIcon />
                                <YouTubeIcon />
                                <InstagramIcon />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
