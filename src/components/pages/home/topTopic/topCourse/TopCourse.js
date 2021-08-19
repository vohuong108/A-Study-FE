import React from 'react'
import './TopCourse.scss'
import { Link } from 'react-router-dom'

const TopCourse = ({ dataCourse }) => {
    return (
        <>
        {dataCourse  
        ?   <div className="topCourse">
                <div className="course-poster">
                    <Link to="/search/course/2">
                        <img src={dataCourse.poster} />
                    </Link>
                </div>
                <div className="course-desc">
                    <Link to="/search/course/2">
                        <h3 className="course-title">{dataCourse.title}</h3>
                    </Link>
                    <span className="course-author">{dataCourse.author}</span>
                </div>
                
            </div>
        : (<></>)
        }
        </>
    )
}

export default TopCourse
