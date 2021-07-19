import React from 'react'
import './TopCourse.css'
const TopCourse = ({ dataCourse }) => {
    return (
        <>
        {dataCourse  
        ?   <div className="topCourse">
                <div className="course-poster">
                    <img src={dataCourse.poster} />
                </div>
                <div className="course-desc">
                    <h3 className="course-title">{dataCourse.title}</h3>
                    <span className="course-author">{dataCourse.author}</span>
                </div>
                
            </div>
        : (<></>)
        }
        </>
    )
}

export default TopCourse
