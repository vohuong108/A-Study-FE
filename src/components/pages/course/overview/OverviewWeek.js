import React from 'react'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons'

const OverviewWeek = ({ dataWeek, idCourse }) => {

    return (
        <>
            <h3>{dataWeek.weekTitle}</h3>
            <Row className="week-content" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col xs={24} md={10}>
                    <div className="left">
                        <div className="left-item">
                            <Link to={`/learn/${idCourse}/week/${dataWeek.idWeek}/v/`}>
                                <PlayCircleOutlined className="icon"/>
                                <p>Videos</p>
                            </Link>
                        </div>
                        <div className="left-item">
                            <Link to={`/learn/${idCourse}/week/${dataWeek.idWeek}/r/`}>
                                <ReadOutlined className="icon"/>
                                <p>Readings</p>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={14}>
                    <div className="right">
                        <div className="right-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>REQUIRED</th>
                                        <th>GRADE</th>
                                        <th>DUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="require">
                                            <Link to={`/learn/${idCourse}/week/${dataWeek.idWeek}/q/`}>
                                                <div className="check">
                                                    {dataWeek?.quiz?.passed === "true" 
                                                        ?<CheckCircleFilled style={{fontSize: '1.5rem', color: 'rgb(31, 131, 84)'}} />
                                                        :<ContainerOutlined style={{fontSize: '1.5rem', color: '#000'}}/>
                                                    }
                                                </div>
                                                <div className="require-content">
                                                    <span>Quiz</span><br/>
                                                    <span>{`${dataWeek.quiz.time} min`}</span>

                                                </div>
                                            </Link>
                                        </td>
                                        <td>{dataWeek.quiz.grade}</td>
                                        <td>
                                            <span>{dataWeek.quiz.due}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default OverviewWeek
