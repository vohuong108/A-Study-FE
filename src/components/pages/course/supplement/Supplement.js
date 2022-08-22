import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { selectWeekByID } from '../../../../features/course/currentCourse/courseSlice';
import { useSelector } from 'react-redux';

import './Supplement.scss';

import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons';
import { Button } from 'antd';


const Supplement = ({}) => {
    const { id, weekId } = useParams();
    const user = useSelector(state => state.user.userObj);
    const weekData = useSelector(state => selectWeekByID(state, weekId));

    return (
        <>
        {weekData && 
            <div className="supplement">
                <div className="container supplement-container">
                    <div className="supplement-row">
                        <div className="supplement-header">
                            <h1>{`Week ${weekData.weekOrder}`}</h1>
                        </div>
                        <div className="supplement-content-wrap">
                            <div className="supplement-subtopic">
                                <h3>{weekData.name}</h3>
                                <ul className="subtopic-wrap">
                                    {weekData.contents.map((content, index) => {
                                            if(user?.userRole === "AUTHOR" || user?.userRole === "ADMIN_TRAINEE" || user?.userRole === "SUPER_ADMIN") {
                                                if (content.contentStatus === "PUBLIC") return (
                                                    <li key={index}>
                                                        {content.contentType === 'TEXT' && (
                                                            <Link to={`/learn/${id}/week/${weekData.id}/r/${content.id}`}>
                                                                <ReadOutlined className="subtopic-icon" />
                                                                <p>
                                                                    <strong>{`${content.contentType}:`} </strong>
                                                                    {content.name}
                                                                </p>
                                                            </Link>
                                                        )}
                                                        {content.contentType === 'VIDEO' && (
                                                            <Link to={`/learn/${id}/week/${weekData.id}/v/${content.id}`}>
                                                                <PlayCircleOutlined className="subtopic-icon" />
                                                                <p>
                                                                    <strong>{`${content.contentType}:`} </strong>
                                                                    {content.name}
                                                                </p>
                                                            </Link>
                                                        )}
                                                        {content.contentType === 'QUIZ' && (
                                                            <Link to={`/learn/${id}/week/${weekData.id}/q/${content.id}`}>
                                                                <ContainerOutlined className="subtopic-icon" />
                                                                <p>
                                                                    <strong>{`${content.contentType}:`} </strong>
                                                                    {content.name}
                                                                </p>
                                                            </Link>
                                                        )}
                                                    </li>
                                                )
                                            } else if(user?.userRole === "STUDENT") return (
                                                <li key={index}>
                                                    {content.contentType === 'TEXT' && (
                                                        <Link to={`/learn/${id}/week/${weekData.id}/r/${content.id}`}>
                                                            <ReadOutlined className="subtopic-icon" />
                                                            <p>
                                                                <strong>{`${content.contentType}:`} </strong>
                                                                {content.name}
                                                            </p>
                                                        </Link>
                                                    )}
                                                    {content.contentType === 'VIDEO' && (
                                                        <Link to={`/learn/${id}/week/${weekData.id}/v/${content.id}`}>
                                                            <PlayCircleOutlined className="subtopic-icon" />
                                                            <p>
                                                                <strong>{`${content.contentType}:`} </strong>
                                                                {content.name}
                                                            </p>
                                                        </Link>
                                                    )}
                                                    {content.contentType === 'QUIZ' && (
                                                        <Link to={`/learn/${id}/week/${weekData.id}/q/${content.id}`}>
                                                            <ContainerOutlined className="subtopic-icon" />
                                                            <p>
                                                                <strong>{`${content.contentType}:`} </strong>
                                                                {content.name}
                                                            </p>
                                                        </Link>
                                                    )}
                                                </li>
                                            )
                                            
                                        })
                                    }
                                </ul>
                            </div>
        
                        </div>
                        {(user.userRole === 'AUTHOR' || user.userRole === 'SUPER_ADMIN') &&
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
