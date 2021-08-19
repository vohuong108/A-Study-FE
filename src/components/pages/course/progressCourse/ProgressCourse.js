import React, { useState, useEffect } from 'react'
import './ProgressCourse.scss'
import 'antd/dist/antd.css';
import { Progress, Statistic, Row, Col, Button } from 'antd'
import { TeamOutlined  } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const ProgressCourse = ({ data, permission }) => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        if(data) {
            let reUrl = data.courseId.split('-').join('');
            setUrl(reUrl);
        }
    }, [data.name])
    
    return (
        <>
        {data && 
            <div className="progress-course">
                <div className="progress-course-wrap">
                    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, {xs: 16, sm: 16}]}>
                        <Col xs={0} sm={0} md={0} lg={3}>
                            <div className="progress-course-poster">
                                <Link to={`/course/${url}`}>
                                    {/* <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format&dpr=1&w=100&h=100&fit=clamp" alt=""/> */}
                                    <img src={data.poster} alt="poster"/>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={20} lg={18}>
                            <div className="course-info">
                                <div className="course-desc">
                                    <Link to={`/course/${url}`}>
                                        {/* <h3>Machine Learning Foundations: A Case Study Approach</h3>
                                        <p>University of Washington</p> */}
                                        <h3 className="p-course-title">{data.name}</h3>
                                        <p className="p-course-author">{data.author}</p>
                                    </Link>
                                    {permission === 'teacher' ? <Statistic className="course-statistic" value={data.numOfStudent} prefix={<TeamOutlined  />}/> : ''}
                                </div>
                                <div className="progress-info">
                                    {permission === 'teacher' ? <p>Teach Progress</p> : <p>Progress</p>}
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        strokeWidth={10}
                                        percent={30}
                                        percent={data.progress}
                                    />
                                    
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={3}>
                            <div className="progress-course-btn">
                                {permission === 'teacher' &&
                                    <Link to={`/edit/${url}`}>
                                        <Button className="pc-btn edit-btn" shape="round">EDIT</Button>
                                    </Link>
                                }
                                <Link to={`/course/${url}`}>
                                    <Button className="pc-btn resume-btn" shape="round">RESUME</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        }
        </>
    )
}

export default ProgressCourse

