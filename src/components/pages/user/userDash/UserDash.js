import React from 'react'
import './UserDash.css'
import ProgressCourse from './progressCourse/ProgressCourse.js'

const UserDash = () => {
    return (
        <div className="userDash">
            <div className="container">
                <div className="row userDash-row">
                    <div className="title">My Courses</div>
                    <ProgressCourse />
                    <ProgressCourse />
                    <ProgressCourse />
                    <ProgressCourse />
                </div>
            </div>            
        </div>
    )
}

export default UserDash
