import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectContentByID } from '../../../../../features/course/currentCourse/courseSlice';
import courseApi from '../../../../../api/courseApi';

import './LectureVideo.scss';

import { message } from 'antd';
import ReactPlayer from 'react-player';


const LectureVideo = () => {
    const { courseId, weekId, contentId } = useParams();
    const lecture = useSelector(state => selectContentByID(state, weekId, contentId));
    const [contentUrl, setContentUrl] = useState();
    const history = useHistory();

    useEffect(() => {
        let getContent = async () => {
            try {
                let responseUrl = await courseApi.getLectureContentUrl({courseId, weekId, contentId});
                console.log(responseUrl);
                setContentUrl(responseUrl.data.url);

            } catch (err) {
                console.log(err.response.data);
                message.error({
                    content: err.response.data.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });

                history.push(`/course/${courseId}/week/${weekId}`);
            }
        }

        getContent();
        
    }, [weekId, contentId])

    return (
        <React.Fragment>
            <h1 className="lecture-title">
                {lecture?.name}
            </h1>
            <div className="player-wrapper">
                <ReactPlayer 
                    className="react-player" 
                    controls={true} 
                    url={contentUrl} 
                    width='100%'
                    height='100%'
                />
            </div>
        </React.Fragment>
    )
}

export default LectureVideo
