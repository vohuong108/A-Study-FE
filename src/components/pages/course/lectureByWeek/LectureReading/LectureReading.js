import React from 'react'
import { Typography } from 'antd'
import 'antd/dist/antd.css'
import './LectureReading.scss'
import { selectLectureByID } from '../../../../../features/course/currentCourse/courseSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Interweave from 'interweave'

const LectureReading = () => {
    const { idWeek, idLecture } = useParams();
    const lecture = useSelector(state => selectLectureByID(state, idWeek, idLecture));

    return (
        <Typography className="lecture-reading">
            <Typography.Title>
                {lecture && lecture.name}
            </Typography.Title>
            {lecture && <Interweave content={lecture.content} />}

        </Typography>
    )
}

export default LectureReading
