import React, { useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCourseInfo, enrollCourse } from '../../../features/search/searchAction';

import './PaidCourse.scss';

import { Row, Col, Rate, Avatar, Button, Divider, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import AvatarLogo from '../../../assets/avatar.png';

const PaidCourse = ({ history, location }) => {
    const { courseId } =  useParams();
    const user = useSelector(state => state.user.userObj);
    const courseInfo = useSelector(state => state.search.courseInfo);
    const dispatch = useDispatch();

    const handleEnroll = async () => {

        if(!user) {
            history.push('/login', { from: location });

        } else {
    
            message.loading({ content: 'Loading...', key: "enroll-msg" });
            let response = await dispatch(enrollCourse({ courseId }));

            if(response?.error) {
                message.error({
                    content: response.payload.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            } else {
                message.success({
                    content: response.payload.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });
            }
        }
    }

    useEffect(() => {

        const getCourseInfoById = async () => {

            let response = await dispatch(getCourseInfo({ courseId }));

            if(response?.error) {
                message.error({
                    content: response.payload.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });
            } 
        }

        getCourseInfoById();
    }, [courseId])
    return (
        <div className="paid-course">
            <section className="paid-course-banner">
                <div className="container banner-container">
                    <Row 
                        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} 
                        className="course-banner-container"
                    >
                        <Col span={24}>
                            <h1 className="course-name">{courseInfo?.name}</h1>
                            {/* <p className="course-target">{courseInfo?.courseTarget}</p>
                            <div className="course-rate">
                                <Rate disabled allowHalf defaultValue={courseInfo?.numRate} className="course-rate-star" style={{fontSize: '14px'}}/>
                                <span className="course-rate-num">{courseInfo?.numRate}</span>
                                <span className="course-ratings">{courseInfo?.rating} ratings</span>
                            </div> */}
                            <div className="author-wrap">
                                <Avatar
                                    className="author-avt"
                                    size={40}
                                    style={{ backgroundColor: 'rgb(236 244 233)' }}
                                    src={AvatarLogo}
                                />
                                <span>{courseInfo?.author}</span>
                            </div>
                            {courseInfo?.isAccess 
                                ? <Link to={`/course/${courseId}`}>
                                    <Button className="btn-enroll" disabled={!user}>
                                        Go to course
                                    </Button>
                                </Link>
                                : <Button className="btn-enroll" onClick={handleEnroll}>
                                    Enroll Now
                                </Button>
                            
                            }
                            
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="paid-course-detail">
                <div className="container detail-container">
                    <Row className="course-detail-container">
                        <Col span={24}>
                            <div className="col-gain-wrap">
                                <div className="what-learn">
                                    <p className="title">WHAT YOU WILL LEARN</p>
                                    <Row 
                                        className="what-learn-row" 
                                        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}
                                    >
                                        {courseInfo?.learns?.map((item, index) => 
                                            <Col key={index} className="what-learn-item" xs={24} sm={12}>
                                                <CheckOutlined className="icon-checkout" />
                                                <p>{item}</p>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                                <Divider />
                                <div className="skill-gain">
                                    <p className="title">SKILLS YOU GAIN</p>
                                    <div className="skill-learn-wrap">
                                        {courseInfo?.skills?.map((item, index) => 
                                            <span key={index} className="skill-item">{item}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="course-about-container">
                        <Col span={24}>
                            <div className="col-about-wrap">
                                <h2 className="about-title">About this Specialization</h2>
                                <p className="content">{courseInfo?.description}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            
        </div>
    )
}

export default PaidCourse
