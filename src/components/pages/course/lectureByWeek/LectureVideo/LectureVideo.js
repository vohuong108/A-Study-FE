import React from 'react'
import ReactPlayer from 'react-player'
import './LectureVideo.scss'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectLectureByID } from '../../../../../features/course/currentCourse/courseSlice'

const LectureVideo = () => {
    const { weekId, lectureId } = useParams();
    const lecture = useSelector(state => selectLectureByID(state, weekId, lectureId));

    return (
        <React.Fragment>
            <h1 className="lecture-title">
                {lecture?.title}
            </h1>
            <div className="player-wrapper">
                <ReactPlayer 
                    className="react-player" 
                    controls={true} 
                    url={`http://localhost:8888/api${lecture?.url}`} 
                    width='100%'
                    height='100%'
                />
            </div>
        </React.Fragment>
    )
}

export default LectureVideo
