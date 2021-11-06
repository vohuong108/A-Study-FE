import React from 'react'
import './sidebar.scss'
import {PeopleOutline,Home,Comment,Report,CollectionsBookmark, Timeline,TrendingUpOutlined,MailOutline} from '@mui/icons-material';
import {Link} from "react-router-dom";

export default function sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="title">Dashboard</h3>
                    <ul className="sidebarList">
                        <div className="sidebarListItem"><Home  className="sidebarIcon"/> Trang chủ</div>
                        <div className="sidebarListItem"><Timeline  className="sidebarIcon"/>Phân tích</div>
                        <div className="sidebarListItem"><TrendingUpOutlined  className="sidebarIcon"/>Hoạt động</div> 
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="title">Quản lý</h3>
                    <ul className="sidebarList">
                       <Link to="/admin/user"> 
                       <div className="sidebarListItem"><PeopleOutline className="sidebarIcon"/>Thành Viên </div>
                       </Link>
                        <div className="sidebarListItem"><CollectionsBookmark  className="sidebarIcon"/> Khóa học</div>
                        
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="title">Thông báo</h3>
                    <ul className="sidebarList">
                        <div className="sidebarListItem"><MailOutline className="sidebarIcon"/> Mail</div>
                        <div className="sidebarListItem"><Comment className="sidebarIcon"/> Phản hồi</div>
                        <div className="sidebarListItem">< Report className="sidebarIcon"/> Report</div> 
                    </ul>
                </div>
            </div>
        </div>
    )
}
