import React from 'react'
import './topbar.scss'
import {Notifications,Language ,Settings} from '@mui/icons-material/';


export default function Topbar() {
    return (
        <div className="TopBarWrapper">
            <div className="topLeft">
                <span className="logo">E-Learning</span>
            </div>
            <div className="topRight">
                <div className="IconContainer">
                    <Notifications sx={{fontSize :30}}/>
                    <span className="topIconBadge">7</span>
                </div>
                <div className="IconContainer">
                    <Language sx={{fontSize :30}}/>
                   
                </div>
                <div className="IconContainer">
                    <Settings sx={{fontSize :30}}/>
                    
                </div>
                <img src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI" alt="" className="topAvt" />
            </div>
            
        </div>
    )
}
