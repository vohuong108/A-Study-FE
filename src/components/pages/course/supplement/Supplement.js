import React from 'react'
import './Supplement.scss'
import 'antd/dist/antd.css'
import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { selectWeekByID } from '../../../../features/course/currentCourse/courseSlice'
import { useSelector } from 'react-redux'

const Supplement = ({ permission }) => {
    const { id, idWeek } = useParams();
    const dataWeek = useSelector(state => selectWeekByID(state, idWeek))
    return (
        <>
        {dataWeek && 
            <div className="supplement">
                <div className="container supplement-container">
                    <div className="supplement-row">
                        <div className="supplement-header">
                            <h1>{`Week ${dataWeek.idWeek}`}</h1>
                        </div>
                        <div className="supplement-content-wrap">
                            <div className="supplement-subtopic">
                                <h3>{dataWeek.weekTitle}</h3>
                                <ul className="subtopic-wrap">
                                    {dataWeek.lectures.map((lecture, index) => {
                                        return lecture.status === 'publish' &&  
                                        <li key={index}>
                                            {lecture.type === 'reading' && (
                                                <Link to={`/learn/${id}/week/${dataWeek.idWeek}/r/${lecture.idLecture}`}>
                                                    <ReadOutlined className="subtopic-icon" />
                                                    <p>
                                                        <strong>{`${lecture.type}:`} </strong>
                                                        {lecture.name}
                                                    </p>
                                                </Link>
                                            )}
                                            {lecture.type === 'video' && (
                                                <Link to={`/learn/${id}/week/${dataWeek.idWeek}/v/${lecture.idLecture}`}>
                                                    <PlayCircleOutlined className="subtopic-icon" />
                                                    <p>
                                                        <strong>{`${lecture.type}:`} </strong>
                                                        {lecture.name}
                                                    </p>
                                                </Link>
                                            )}
                                            {lecture.type === 'quiz' && (
                                                <Link to={`/learn/${id}/week/${dataWeek.idWeek}/q/${lecture.idLecture}`}>
                                                    <ContainerOutlined className="subtopic-icon" />
                                                    <p>
                                                        <strong>{`${lecture.type}:`} </strong>
                                                        {lecture.name}
                                                    </p>
                                                </Link>
                                            )}
                                        </li>
                                    })}
                                </ul>
                            </div>
        
                        </div>
                        {permission === 'teacher' &&
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
