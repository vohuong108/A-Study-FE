import React from 'react'
import './TopTopic.css'
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
