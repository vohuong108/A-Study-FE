import React, { useEffect, } from 'react'
import './PaidCourse.scss'
import 'antd/dist/antd.css';
import { Row, Col, Rate, Avatar, Button, Divider, message } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getToken } from '../../../utils/localStorageHandler'
import { getSearchedCourseInfo, enrollCourse } from '../../../features/search/searchAction'


const PaidCourse = ({ history, location }) => {
    const { idCourse } =  useParams();
    const user = useSelector(state => state.user.userObj);
    const courseInfo = useSelector(state => state.search.courseInfo);
    const dispatch = useDispatch();

    const handleEnroll = async () => {
        let token = getToken();

        if(!user && !token) {
            history.push('/login', {from: location});
        } else {
            let request = {
                idCourse,
                data: { enrolled: true },
                access_token: token
            }
    
            try {
                message.loading({ content: 'Loading...', key: "enroll-msg" });
                let result = await dispatch(enrollCourse(request));
                message.success({
                    content: "Enrolled course successfully",
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            }

        }
    }

    useEffect(() => {
        let token = getToken();
        let request = {
            access_token: token,
            idCourse: idCourse
        }

        const getInfoCourse = async (requestData) => {
            try {
                let result = await dispatch(getSearchedCourseInfo(requestData))

            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            }
        }

        getInfoCourse(request);
    }, [idCourse])
    return (
        <div className="paid-course">
            <section className="paid-course-banner">
                <div className="container banner-container">
                    <Row 
                        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} 
                        className="course-banner-container"
                    >
                        <Col span={24}>
                            <h1 className="course-name">{courseInfo?.courseName}</h1>
                            <p className="course-target">{courseInfo?.courseTarget}</p>
                            <div className="course-rate">
                                <Rate disabled allowHalf defaultValue={courseInfo?.numRate} className="course-rate-star" style={{fontSize: '14px'}}/>
                                <span className="course-rate-num">{courseInfo?.numRate}</span>
                                <span className="course-ratings">{courseInfo?.rating} ratings</span>
                            </div>
                            <div className="author-wrap">
                                <Avatar
                                    className="author-avt"
                                    size={40}
                                    style={{ backgroundColor: 'rgb(236 244 233)' }}
                                    src={courseInfo?.authorAvt}
                                />
                                <span>{courseInfo?.authorName}</span>
                            </div>
                            {courseInfo?.enrolled 
                                ? <Link to={`/course/${idCourse}`}>
                                    <Button className="btn-enroll" disabled={!courseInfo}>
                                        Go to course
                                    </Button>
                                </Link>
                                : <Button className="btn-enroll" disabled={!courseInfo} onClick={handleEnroll}>
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
                                        {courseInfo?.whatLearn.map((item, index) => 
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
                                        {courseInfo?.skills.map((item, index) => 
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
                                <p className="content">{courseInfo?.about}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            
        </div>
    )
}

export default PaidCourse
