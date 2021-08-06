import React, { useEffect, useState } from 'react'
import './UserDash.css'
import ProgressCourse from '../../course/progressCourse/ProgressCourse'
import { getToken } from '../../../../utils/localStorageHandler'
import { getUserCourse } from '../../../../features/course/courseAction'
import { useDispatch, useSelector } from 'react-redux'
import { selectCourses } from '../../../../features/course/courseSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const UserDash = () => {
    const dispatch = useDispatch();
    const courses = useSelector(selectCourses);

    useEffect(() => {
        const getCourses = async () => {
            try {
                let access_token = getToken();
                const courses = await dispatch(getUserCourse(access_token))
                const un_courses = unwrapResult(courses);
                
                console.log("unwrapResult in dash", un_courses)
                
            } catch (error) {
                console.error("error in login: ", error)
            }

        }

        getCourses();

    }, [])

    return (
        <div className="userDash">
            <div className="container">
                <div className="row userDash-row">
                    <div className="title">My Courses</div>
                    {/* {courses ? courses.map(course => {
                        <ProgressCourse key={course._id} data={course}/>
                    }) : ''} */}

                    {/*get permision from store so don't need author dash*/}
                    <ProgressCourse permission={'student'}/>

                </div>
            </div>            
        </div>
    )
}

export default UserDash
