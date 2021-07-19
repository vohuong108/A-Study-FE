import React from 'react'
import './ChainCourse.css'
import TopCourse from '../topCourse/TopCourse'

const data = {
    chainTitle: 'Students are viewing',
    courses: [
        {
            id: 1,
            title: 'JavaScript for beginners: Create 27 projects from scratch',
            author: 'Bluelime Learning Solutions',
            poster: 'https://img-c.udemycdn.com/course/240x135/1420678_5bf2_3.jpg'
        }, {
            id: 2,
            title: 'The Complete Digital Marketing Course - 12 Courses in 1',
            author: 'Rob Percival, Daragh Walsh, Codestars by Rob Percival',
            poster: 'https://img-c.udemycdn.com/course/240x135/914296_3670_8.jpg'
        }, {
            id: 3,
            title: 'Graphic Design Masterclass - Learn GREAT Design',
            author: 'Lindsay Marsh',
            poster: 'https://img-c.udemycdn.com/course/240x135/1643044_e281.jpg'
        }, {
            id: 4,
            title: 'The Complete 2021 Web Development Bootcamp',
            author: 'Dr. Angela Yu',
            poster: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_12.jpg'
        }
    ]
}

const ChainCourse = () => {
    return (
        <div className="chainCourse">
            <div className="chainCourse-title">
                <h2>{data.chainTitle}</h2>
            </div>
            <div className="chainCourse-wrap">
                {data.courses.map((course) => (
                    <div className="col-3 chain-col" key={course.id}>
                        <TopCourse dataCourse={course}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChainCourse
