import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import 'antd/dist/antd.css'
import './LectureReading.scss'
import { selectLectureByID } from '../../../../../features/course/currentCourse/courseSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Interweave from 'interweave'
import axios from 'axios'

const LectureReading = () => {
    const { weekId, lectureId } = useParams();
    const lecture = useSelector(state => selectLectureByID(state, weekId, lectureId));
    const [content, setContent] = useState();

    useEffect(() => {
        let getContent = async () => {
            // console.log("lecture data: ", lecture);
            let response = await axios.get(`http://localhost:8888/api${lecture?.url}`);
            // console.log("response get content text: ", response);
            setContent(response.data);
        }

        getContent();

    }, [weekId, lectureId])
    return (
        <Typography className="lecture-reading">
            <Typography.Title>
                {lecture && lecture.title}
            </Typography.Title>
            {lecture && <Interweave content={content} />}

        </Typography>
    )
}

export default LectureReading
