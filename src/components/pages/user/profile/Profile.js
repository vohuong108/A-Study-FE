import React from 'react'
import './Profile.scss'
import 'antd/dist/antd.css';
import { Avatar, Row, Col } from 'antd';
import Chart from './Chart'
import UpdateProfile from './updateProfile/UpdateProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state => state.user.userObj);

    return (
        <div className="profile">
            <div className="profile-container">
                <Row className="profile-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="profile-row-left" xs={24} sm={24} lg={9}>
                        <div className="user-card">
                            <div className="user-card-wrap">
                                <div className="user-card-info">
                                    <Avatar className="user-avt" 
                                        src={user?.avatar} 
                                        size={80}
                                    />
                                    <div className="user-content">
                                        <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
                                        <p>{`ID: ${user?.userId}`}</p>
                                        <p>{`Email: ${user?.email}`}</p>
                                        <p>{`Role: ${user?.permission}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="user-chart">
                            <div className="chart-title">Course Completion Assessment Chart</div>
                            <div className="chart-wrap">
                                <Chart progress={user?.progress} />
                            </div>
                        </div>
                    </Col>
                    <Col className="profile-row-right" xs={24} sm={24} lg={15}>
                        <UpdateProfile />
                    </Col>
                </Row>
            </div>
            
        </div>
    )
}

export default Profile
