import React from 'react'
import './Supplement.scss'
import 'antd/dist/antd.css'
import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { selectWeekByID } from '../../../../features/course/currentCourse/courseSlice'
import { useSelector } from 'react-redux'

const Supplement = ({ permission }) => {
    const { id, weekId } = useParams();
    const dataWeek = useSelector(state => selectWeekByID(state, weekId))
    return (
        <>
        {dataWeek && 
            <div className="supplement">
                <div className="container supplement-container">
                    <div className="supplement-row">
                        <div className="supplement-header">
                            <h1>{`Week ${dataWeek.serialWeek}`}</h1>
                        </div>
                        <div className="supplement-content-wrap">
                            <div className="supplement-subtopic">
                                <h3>{dataWeek.name}</h3>
                                <ul className="subtopic-wrap">
                                    {dataWeek.lectures.map((lecture, index) => {
                                        return lecture.lectureStatus === 'PUBLIC' &&  
                                        <li key={index}>
                                            {lecture.lectureType === 'TEXT' && (
                                                <Link to={`/learn/${id}/week/${dataWeek.weekId}/r/${lecture.lectureId}`}>
                                                    <ReadOutlined className="subtopic-icon" />
                                                    <p>
                                                        <strong>{`${lecture.lectureType}:`} </strong>
                                                        {lecture.title}
                                                    </p>
                                                </Link>
                                            )}
                                            {lecture.lectureType === 'VIDEO' && (
                                                <Link to={`/learn/${id}/week/${dataWeek.weekId}/v/${lecture.lectureId}`}>
                                                    <PlayCircleOutlined className="subtopic-icon" />
                                                    <p>
                                                        <strong>{`${lecture.lectureType}:`} </strong>
                                                        {lecture.title}
                                                    </p>
                                                </Link>
                                            )}
                                            {lecture.lectureType === 'QUIZ' && (
                                                <Link to={`/learn/${id}/week/${dataWeek.weekId}/q/${lecture.lectureId}`}>
                                                    <ContainerOutlined className="subtopic-icon" />
                                                    <p>
                                                        <strong>{`${lecture.lectureType}:`} </strong>
                                                        {lecture.title}
                                                    </p>
                                                </Link>
                                            )}
                                        </li>
                                    })}
                                </ul>
                            </div>
        
                        </div>
                        {(permission === 'AUTHOR' || permission === 'ADMIN') &&
                            <Link to={`/edit/${id}`}>
                                <Button shape="round" className="s-to-edit">Go To Edit</Button>
                            </Link>
                        }
                    </div>
                </div>
                
            </div>
        }
        </>
    )
}

export default Supplement
