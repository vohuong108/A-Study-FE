import React from 'react'
import ReactPlayer from 'react-player'
import './LectureVideo.scss'

const LectureVideo = () => {
    return (
        <React.Fragment>
            <h1 className="lecture-title">
                Document retrieval: A case study in clustering and measuring similarity
            </h1>
            <div className="player-wrapper">
                <ReactPlayer 
                    className="react-player" 
                    controls={true} 
                    url='https://www.youtube.com/watch?v=YDzv0GC1SfI' 
                    width='100%'
                    height='100%'
                />
            </div>
        </React.Fragment>
    )
}

export default LectureVideo
