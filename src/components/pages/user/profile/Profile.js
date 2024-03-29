import React from 'react'
import { useSelector } from 'react-redux';

import './Profile.scss';
import { Avatar, Row, Col } from 'antd';
import Chart from './Chart';
import UpdateProfile from './updateProfile/UpdateProfile';
import AvatarLogo from '../../../../assets/avatar.png';

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
                                        src={AvatarLogo} 
                                        size={80}
                                    />
                                    <div className="user-content">
                                        <h3>{`${user?.username}`}</h3>
                                        <p>{`Email: ${user?.email}`}</p>
                                        <p>{`Role: ${user?.userRole}`}</p>
                                        {(user?.profile?.firstName && user?.profile?.lastName) &&
                                        <p>{`Name: ${user?.profile?.firstName} ${user?.profile?.lastName}`}</p>}
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
