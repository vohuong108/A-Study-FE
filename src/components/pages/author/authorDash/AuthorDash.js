import React from 'react'
import './AuthorDash.scss'
import ProgressCourse from '../../course/progressCourse/ProgressCourse'

const data = [
    {
        idCourse: 1,
        name: 'Machine Learning 1',
        author: 'University of Washington',
        numOfStudent: 1128,
        progress: 30,
        poster: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format&dpr=1&w=100&h=100&fit=clamp",
    }, {
        idCourse: 2,
        name: 'Machine Learning 2',
        author: 'University of Washington',
        numOfStudent: 1120,
        progress: 20,
        poster: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format&dpr=1&w=100&h=100&fit=clamp",
    }, {
        idCourse: 3,
        name: 'Machine Learning 3',
        author: 'University of Washington',
        numOfStudent: 1100,
        progress: 47,
        poster: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format&dpr=1&w=100&h=100&fit=clamp",
    }, {
        idCourse: 4,
        name: 'Machine Learning 3',
        author: 'University of Washington',
        numOfStudent: 580,
        progress: 72,
        poster: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format&dpr=1&w=100&h=100&fit=clamp",
    }
]

const AuthorDash = () => {
    return (
        <div className="author-dash">
            <div className="container">
                <div className="row author-dash-row">
                    <div className="author-dash-title">My Courses</div>
                    {data && data.map(course => (
                        <ProgressCourse permission={'teacher'} data={course}/>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default AuthorDash
