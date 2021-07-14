import React from 'react'
import arrowRight from '../../../assets/arrowRight.png'

const Topic = ({ topic }) => {
    return (
        <div className="topic">
            <div className="topic-container">
                <span>{!topic ? topic.title : ''}</span>
                <img src={arrowRight} alt=""></img>
            </div>
        </div>
    )
}

export default Topic
