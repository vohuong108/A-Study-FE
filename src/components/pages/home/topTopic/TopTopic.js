import React from 'react'
import './TopTopic.scss'
import ChainCourse from './chainCourse/ChainCourse'

const TopTopic = () => {
    return (
        <div className="topTopic">
            <div className="container">
                <div className="row topTopic-row">
                    <ChainCourse />
                </div>
                <div className="row topTopic-row">
                    <ChainCourse />
                </div>
                <div className="row topTopic-row">
                    <ChainCourse />
                </div>
                <div className="row topTopic-row">
                    <ChainCourse />
                </div>
            </div>
            
        </div>
    )
}

export default TopTopic
