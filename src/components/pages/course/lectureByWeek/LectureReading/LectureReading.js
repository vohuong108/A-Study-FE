import React, { useState, useEffect } from 'react';
import { selectContentByID } from '../../../../../features/course/currentCourse/courseSlice';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import courseApi from '../../../../../api/courseApi';

import './LectureReading.scss';

import Interweave from 'interweave';
import axios from 'axios';
import { Typography, message } from 'antd';


const LectureReading = () => {
    const { courseId, weekId, contentId } = useParams();
    const lecture = useSelector(state => selectContentByID(state, weekId, contentId));
    const [content, setContent] = useState();
    const history = useHistory();

    useEffect(() => {
        let getContent = async () => {
            try {
                let responseUrl = await courseApi.getLectureContentUrl({courseId, weekId, contentId});
                console.log(responseUrl);
                let responseContent = await axios.get(responseUrl.data.url);
                console.log(responseContent);
                setContent(responseContent.data);

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
        <Typography className="lecture-reading">
            <Typography.Title>
                {lecture && lecture.name}
            </Typography.Title>
            {lecture && <Interweave content={content} />}

        </Typography>
    )
}

export default LectureReading
