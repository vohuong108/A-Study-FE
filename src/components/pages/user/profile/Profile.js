import React from 'react'
import './Profile.scss'
import 'antd/dist/antd.css';
import { Avatar } from 'antd';
import Chart from './Chart'

const Profile = () => {
    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-row">
                    <div className="profile-row-left">
                        <div className="user-card">
                            <div className="user-card-wrap">
                                <div className="user-card-info">
                                    <Avatar className="user-avt" 
                                        src="http://oasis.uet.vnu.edu.vn/api/resources/avatar/default.png" 
                                        size={80}
                                    />
                                    <div className="user-content">
                                        <h3>Võ Văn Hướng</h3>
                                        <p>ID: 19020318</p>
                                        <p>Email: huongvovan123@gmail.com</p>
                                        <p>Role: Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="user-chart">
                            <div className="chart-title">Course Completion Assessment Chart</div>
                            <div className="chart-wrap">
                                <Chart />
                            </div>
                        </div>
                    </div>
                    <div className="profile-row-right">
                        right
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Profile
